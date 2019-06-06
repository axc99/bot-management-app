import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Drawer, List, Empty, Modal, Button, Avatar, Badge, Popover, Select, Input, Icon, Tag, Divider } from 'antd';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';
import ruStrings from 'react-timeago/lib/language-strings/ru';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import EditLeadDrawer from './Leads/EditLeadDrawer';
import FilterLeadsForm from './Leads/FilterLeadsForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

const source = axios.CancelToken.source();
const formatter = buildFormatter(ruStrings);

class LeadItem extends React.Component {
  confirmDelete = (leadId) => {
    Modal.confirm({
      title: 'Удалить заявку',
      content: 'Вы действительно хотите удалить данную заявку? Данные будет безвозвратно утерены.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        axios.delete(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/');
        this.props.list.deleteOne(leadId);
      }
    });
  }
  render() {
    const lead = this.props.lead;
    let btnContent = null;
    switch (lead.status) {
      case 1:
        btnContent = (<div><Badge status="default" dot={true} /> Не обработан</div>);
        break;
      case 2:
        btnContent = (<div><Badge status="processing" dot={true} /> В обработке</div>);
        break;
      case 3:
        btnContent = (<div><Badge status="success" dot={true} /> Обработан</div>);
        break;
      case 4:
        btnContent = (<div><Badge status="error" dot={true} /> Закрыт</div>);
        break;
    };
    let actions = [
      <Button onClick={() => this.props.openEditDrawer(lead.id)}>Открыть</Button>,
      <Button onClick={() => this.confirmDelete(lead.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
    ];
    if (btnContent) actions.unshift(<Button onClick={() => this.props.openEditDrawer(lead.id)}>{btnContent}</Button>);
    return (
      <List.Item actions={actions}>
        <List.Item.Meta
            avatar={<Avatar size="large" icon="user" src={(lead.mainProfile && lead.mainProfile.avatarUrls) ? lead.mainProfile.avatarUrls.sm : null}></Avatar>}
            title={<b>{lead.fullName ? lead.fullName : 'Без имени'}</b>}
            description={
              <div>
                {lead.contacts.length ? lead.contacts.join(' | ') : 'Пустая заявка'} <br />
                <div className="app-list-item-info">
                  <TimeAgo date={lead.createdAt} formatter={formatter} /> ({lead.source.typeStr})
                  {
                    lead.tags ? (
                      <div className="app-list-item-info-tags">
                        {lead.tags.map((tag) => <Tag className="app-list-item-info-tag">{tag}</Tag>)}
                      </div>
                    ) : null
                  }
                </div>
              </div>
            } />
      </List.Item>
    )
  }
}

class Leads extends React.Component {
  state = {
    addBtnLoading: false,
    editDrawerVisible: false,
    filterPopoverVisible: false,
    leadTotalCount: 0,
    leads: null,
    search: '',
    filter: null,
    page: 1
  }
  list = {
    addOne: (lead) => {
      const leads = this.state.leads;
      const leadTotalCount = this.state.leadTotalCount+1;
      leads.unshift(lead);
      this.setState({ leads, leadTotalCount });
    },
    updateOne: (id, lead) => {
      const leads = this.state.leads;
      const leadIndex = leads.findIndex((c) => {
        return c.id == id;
      });
      if (leadIndex < 0) return;
      leads[leadIndex] = lead;
      this.setState({ leads });
    },
    deleteOne: (id) => {
      const leads = this.state.leads;
      const leadTotalCount = this.state.leadTotalCount-1;
      const leadIndex = leads.findIndex((c) => {
          return c.id == id;
      });
      if (leadIndex < 0) return;
      leads.splice(leadIndex, 1);
      this.setState({ leads, leadTotalCount });
    }
  }
  // Добавить лид
  addLead = () => {
    this.setState({ addBtnLoading: true });
    axios.post(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/leads/', {
        lead: {}
      })
      .then((res) => {
        if (res.data.error) {
          Modal.error({
            title: 'Ошибка',
            content: res.data.error.message
          });
        } else if (res.data.lead) {
          this.list.addOne(res.data.lead);
          this.openEditDrawer(res.data.lead._id);
        };
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      })
      .finally(() => this.setState({ addBtnLoading: false }));
  }
  // Закрыть: добавление
  closeAddDrawer = () => {
    this.setState({ addDrawerVisible: false });
  }
  // Открыть: изменение
  openEditDrawer = (leadId) => {
    this.setState({ editDrawerVisible: true, leadId });
  }
  // Закрыть: изменение
  closeEditDrawer = () => {
    this.setState({ editDrawerVisible: false, leadId: null });
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
    const { search, page, filter } = this.state;
    const offset = Math.abs(page-1) * 20;

    if (source.token) source.token = null;
    else source.cancel();

    axios
      .get(
        config.serverUrl + '/app-api/projects/' + this.props.project.id + '/leads/'
        + '?offset=' + offset
        + '&search=' + search
        + (
          filter ? (
            '&filterPeriod=' + ((filter.period && filter.period[0] && filter.period[1]) ? filter.period[0]._d.getTime() + ',' + filter.period[1]._d.getTime() : '')
            + '&filterStatus=' + (filter.status ? filter.status : '')
            + '&filterSource=' + (filter.source ? filter.source : '')
          ) : ''
        ),
        { cancelToken: source.token }
      )
      .then((res) => {
        const { leads, leadTotalCount } = res.data;
        this.setState({ leads, leadTotalCount });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  // Установить поиск
  setSearch = (event) => {
    this.setState({ search: event.target.value.trim(), leads: null }, () => this.load());
  }
  // Установить страницу
  setPage = (page) => {
    this.setState({ page, leads: null }, () => this.load());
  }
  // Установить фильтр
  setFilter = (data) => {
    const { period, status, source } = data;
    this.setState({
      filter: ((period && period.length) || status || source) ? {
        period: period ? [period[0], period[1]] : null,
        status: status ? status : null,
        source: source ? source : null
      } : null,
      leads: null
    }, () => this.load());
    this.closeFilterPopover();
  }
  componentDidMount() {
    setTitle('Заявки');
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
            Заявки {this.state.leadTotalCount > 0 ? <div className="app-main-view-header-title-counter">({this.state.leadTotalCount})</div> : null}
          </div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control search">
              <Input allowClear onChange={this.setSearch} placeholder="Поиск..." style={{ width: 200 }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="app-main-view-header-control filter">
              <Popover
                trigger="click"
                onVisibleChange={visible => { return visible ? this.openFilterPopover() : this.closeFilterPopover() }}
                visible={this.state.filterPopoverVisible}
                content={<FilterLeadsForm setFilter={this.setFilter} />}>
                <Badge dot={this.state.filter}>
                  <Button icon="filter">Фильтр</Button>
                </Badge>
              </Popover>
            </div>
            <div className="app-main-view-header-control btn">
              <Button onClick={this.addLead} loading={this.state.addBtnLoading} type="primary" icon="plus">Добавить заявку</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <div className="app-project-leads">
            <List
              bordered
              size="large"
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={(this.state.search || this.state.filter) ? 'По вашему запросу не найдено заявок.' : 'В проекте пока нет заявок.'} /> }}
              loading={!this.state.leads ? true : false}
              pagination={this.state.leads && (this.state.leadTotalCount > this.state.leads.length) ? {
                size: 'large',
                pageSize: 20,
                total: this.state.leadTotalCount,
                onChange: (page, pageSize) => {
                  this.setPage(page);
                }
              } : false}
              dataSource={this.state.leads ? this.state.leads : []}
              renderItem={item => <LeadItem projectId={this.props.project.id} lead={item} list={this.list} openEditDrawer={this.openEditDrawer} />} />
          </div>
        </div>
        {
          this.state.leadId ? (
            <EditLeadDrawer
              list={this.list}
              leadId={this.state.leadId}
              projectId={this.props.project.id}
              visible={this.state.editDrawerVisible}
              close={this.closeEditDrawer} />
          ) : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Leads);
