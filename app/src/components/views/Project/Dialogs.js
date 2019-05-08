import React from 'react';
import axios from 'axios';
import { List, Row, Col, Empty, Modal, Button, Form, Input, Radio, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { setTitle } from '../../../helpers';

class DialogItem extends React.Component {
  render() {
    return (
      <List.Item>
        <List.Item.Meta
            avatar={<Avatar size="medium" icon="user" />}
            title={<b>{this.props.dialog.fullName ? this.props.dialog.fullName : 'Без имени'}</b>}
            description={this.props.dialog.contacts ? this.props.dialog.contacts : 'Пустой диалог'} />
      </List.Item>
    )
  }
}

class Dialogs extends React.Component {
  state = {
    dialogs: null
  }
  componentDidMount() {
    setTitle('Диалоги');
    axios.get('http://localhost./app-api/projects/123/dialogs/', {}, {
      headers: { 'Content-Type': 'application/json' }
    }).then(
      res => {
        const dialogs = res.data.dialogs;
        this.setState({ dialogs });
      },
      err => {
        Modal.error({
          title: (<b>Ошибка при загрузке</b>)
        });
      }
    );
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
          hideOnSinglePage={true}
          loading={!this.state.leads ? true : false}
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

export default Dialogs;
