import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Drawer, List, Empty, Modal, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { setTitle } from '../../../helpers';
import config from '../../../config';

class DialogItem extends React.Component {
  render() {
    return (
      <List.Item actions={[
          <a target="_blank" href={this.props.dialog._service.url}><Button><b>{this.props.dialog._service.typeStr}</b></Button></a>,
          <Button>Открыть</Button>
        ]}>
        <List.Item.Meta
            avatar={<Avatar size="large" icon="user" />}
            title={<b>{this.props.dialog.fullName ? this.props.dialog.fullName : 'Без имени'}</b>}
            description={this.props.dialog.contacts ? this.props.dialog.contacts : 'Пустой диалог'} />
      </List.Item>
    )
  }
}

class Dialogs extends React.Component {
  state = {
    dialogTotalCount: 0,
    dialogs: null,
    page: 0
  }
  componentDidMount() {
    setTitle('Диалоги');
    axios.get(config.serverUrl + 'app-api/projects/' + this.props.project.id + '/dialogs/')
      .then((res) => {
        const dialogs = res.data.dialogs;
        const dialogTotalCount = res.data.dialogTotalCount;
        this.setState({ dialogs, dialogTotalCount });
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при загрузке</b>) });
      });
  }
  render() {
    let content;
    if (this.state.dialogs !== null && this.state.dialogs.length == 0) {
      content = (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="В проекте пока нет диалогов." />
      );
    } else {
      content = (
        <List
          bordered
          loading={!this.state.dialogs ? true : false}
          pagination={this.state.dialogs && (this.state.dialogTotalCount > this.state.dialogs.length) ? {
            size: 'large',
            pageSize: 50,
            total: this.state.dialogTotalCount,
            onChange: (page, pageSize) => {
              axios.get(config.serverUrl + 'app-api/projects/' + this.props.project.id + '/dialogs/?offset=' + (Math.abs(page-1) * 3))
                .then((res) => {
                  const dialogs = res.data.dialogs;
                  const dialogTotalCount = res.data.dialogTotalCount;
                  this.setState({ dialogs, dialogTotalCount });
                })
                .catch((err) => {
                  console.log('Error', err);
                  Modal.error({ title: (<b>Ошибка при загрузке</b>) });
                });
            }
          } : false}
          size="large"
          dataSource={this.state.dialogs ? this.state.dialogs : []}
          renderItem={item => <DialogItem dialog={item} openEditDialog={this.openEditDialog} />} />
      );
    };

    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Диалоги</div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
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
