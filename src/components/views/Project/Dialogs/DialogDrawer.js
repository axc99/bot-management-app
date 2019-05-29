import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Modal, Button, Spin, List } from 'antd';

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
    const infoItems = [
      ['Сообщения', dialog ? dialog.messageCount : '0'],
      ['Добавлено', dialog ? dialog.createdAtStr : '...'],
      ['Источник', (dialog && dialog.source) ? dialog.source.typeStr : '...']
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
              size="small"
              className="app-dialog-list"
              dataSource={infoItems}
              renderItem={item => <List.Item><b>{item[0]}:</b> {item[1]}</List.Item>} />
            <div className="app-dialog-btns">
              {
                (dialog && dialog.lead) ? (
                  <Button className="app-dialog-btn">Открыть лид</Button>
                ) : null
              }
            </div>
          </Spin>
      </Drawer>
    );
  }
}

export default DialogDrawer;
