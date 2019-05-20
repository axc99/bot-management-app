import React from 'react';
import axios from 'axios';
import { Divider, Drawer, List, Modal, Button, Spin } from 'antd';

import config from '../../../../config';

class DialogDrawer extends React.Component {
  state = {
    dialog: null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const form = this.props.form;
    const dialogId = this.props.dialogId;
    if (prevProps.dialogId !== dialogId) {
      if (dialogId) {
        axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/dialogs/' + dialogId + '/')
          .then((res) => {
            const dialog = res.data.dialog;
            this.setState({ dialog });
          })
          .catch((err) => {
            Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
          });
      };
    };
  }
  render() {
    const form = this.props.form;
    const dialog = this.state.dialog;
    const data = [
      ['Первое сообщение', 'awdw'],
      ['Последнее сообщение', 'awdw']
    ];
    return (
      <Drawer
          width="400"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible}
          title={(<b>Диалог {dialog ? '#' + dialog.id : ''}</b>)} >
          <Spin spinning={!dialog} size="large">
          <List
            bordered
            size="small"
            dataSource={data}
            renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
          </Spin>
      </Drawer>
    );
  }
}

export default DialogDrawer;
