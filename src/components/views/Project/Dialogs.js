import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Drawer, List, Empty, Modal, Button, Avatar, Popover, Badge } from 'antd';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';
import ruStrings from 'react-timeago/lib/language-strings/ru';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import DialogDrawer from './Dialogs/DialogDrawer';
import FilterDialogsForm from './Dialogs/FilterDialogsForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

const source = axios.CancelToken.source();
const formatter = buildFormatter(ruStrings);

class DialogItem extends React.Component {
  render() {
    const { dialog } = this.props;
    return (
      <List.Item actions={[
          <Button onClick={() => this.props.openModal(dialog.id)}>Открыть</Button>
        ]}>
        <List.Item.Meta
            avatar={<Avatar size="large" icon="user" src={(dialog.profile && dialog.profile.avatarUrls) ? dialog.profile.avatarUrls.sm : null} />}
            title={<b>{dialog.fullName ? dialog.fullName : 'Без имени'}</b>}
            description={
              <div>
                <div className="app-list-item-info">
                  <TimeAgo date={dialog.createdAt} formatter={formatter} /> {dialog.source ? '('+dialog.source.typeStr+')' : null}
                </div>
              </div>
            } />
      </List.Item>
    )
  }
}

class Dialogs extends React.Component {
  state = {
    modalVisible: false,
    filterPopoverVisible: false,
    filterUse: false,
    dialogTotalCount: 0,
    dialogs: null,
    filter: {
      period: null,
      source: null
    },
    page: 1
  }
  // Открыть
  openModal = (dialogId) => {
    this.setState({ modalVisible: true, dialogId });
  }
  // Закрыть
  closeModal = () => {
    this.setState({ modalVisible: false });
  }
  // Открыть: фильтр
  openFilterPopover = () => {
    this.setState({ filterPopoverVisible: true });
  }
  // Закрыть: фильтр
  closeFilterPopover = () => {
    this.setState({ filterPopoverVisible: false });
  }
  // Загрузка
  load = () => {
    const { page, filter } = this.state;
    const offset = Math.abs(page-1) * 50;

    if (source.token) source.token = null;
    else source.cancel();

    axios
      .get(
        config.serverUrl + '/app-api/projects/' + this.props.project.id + '/dialogs/'
        + '?offset=' + offset
        + '&filterPeriod=' + ((filter.period && filter.period[0] && filter.period[1]) ? filter.period[0]._d.getTime() + ',' + filter.period[1]._d.getTime() : '')
        + '&filterSource=' + (filter.source ? filter.source : ''),
        { cancelToken: source.token }
      )
      .then((res) => {
        const { dialogs, dialogTotalCount } = res.data;
        this.setState({ dialogs, dialogTotalCount });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  // Установить страницу
  setPage = (page) => {
    this.setState({ page, dialogs: null }, () => this.load());
  }
  // Установить фильтр
  setFilter = (data) => {
    const { period, source } = data;
    this.setState({ ...(((period && period.length) || source) ? { filterUse: true } : { filterUse: false }), dialogs: null });
    this.setState({
      filter: {
        period: period ? [period[0], period[1]] : null,
        source: source ? source : null
      }
    }, () => this.load());
    this.closeFilterPopover();
  }
  componentDidMount() {
    setTitle('Диалоги');
    this.load();
  }
  componentWillUnmount() {
    source.cancel();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">
            Диалоги {this.state.dialogTotalCount > 0 ? <div className="app-main-view-header-title-counter">({this.state.dialogTotalCount})</div> : null}
          </div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control filter">
              <Popover
                placement="leftTop"
                trigger="click"
                onVisibleChange={visible => { return visible ? this.openFilterPopover() : this.closeFilterPopover() }}
                visible={this.state.filterPopoverVisible}
                content={<FilterDialogsForm setFilter={this.setFilter} />}>
                <Badge dot={this.state.filterUse}>
                  <Button icon="filter">Фильтр</Button>
                </Badge>
              </Popover>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <List
            bordered
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="В проекте пока нет диалогов." /> }}
            loading={!this.state.dialogs ? true : false}
            pagination={this.state.dialogs && (this.state.dialogTotalCount > this.state.dialogs.length) ? {
              size: 'large',
              pageSize: 50,
              total: this.state.dialogTotalCount,
              onChange: (page, pageSize) => {
                this.setPage(page);
              }
            } : false}
            size="large"
            dataSource={this.state.dialogs ? this.state.dialogs : []}
            renderItem={item => <DialogItem projectId={this.props.project.id} dialog={item} list={this.list} openModal={this.openModal} />} />
        </div>
        <DialogDrawer
          list={this.list}
          dialogId={this.state.dialogId}
          projectId={this.props.project.id}
          visible={this.state.modalVisible}
          close={this.closeModal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Dialogs);
