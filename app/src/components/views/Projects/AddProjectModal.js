import React from 'react';
import axios from 'axios';
import { Form, Input, Select, Modal } from 'antd';

import config from '../../../config';

class AddProjectModal extends React.Component {
  state = {
    sending: false
  }
  showSending() {
    this.setState({ sending: true });
  }
  hideSending() {
    setTimeout(() => {
      this.setState({ sending: false });
    }, 500);
  }
  async send(data) {
    this.showSending();
    axios.post(
      config.serverUrl + 'app-api/projects/', {
        project: data
      })
      .then((res) => {
        const project = res.data.project;
        if (project) {
          Modal.success({
            title: (<b>Проект создан</b>),
            content: '...'
          });
          this.props.close();
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
      })
      .finally(() => this.hideSending());
  }
  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        width={400}
        visible={this.props.visible}
        title={(<b>Создать проект</b>)}
        okText="Создать"
        cancelText="Отмена"
        onOk={this.onOk}
        confirmLoading={this.state.sending}
        onCancel={this.props.close} >
        <Form hideRequiredMark="false" className="app-form" layout="vertical">
          <div className="app-form-fields">
            <Form.Item label="Название проекта" className="app-form-field">
              {getFieldDecorator('name', {
                rules: [ { required: true, message: 'Заполните это поле.' } ],
              })(
                <Input autofocus="true" size="large" />
              )}
            </Form.Item>
            <Form.Item label="Ссылка на сайт" className="app-form-field">
              {getFieldDecorator('websiteUrl', {
                rules: [ { required: true, message: 'Заполните это поле.' } ],
              })(
                <Input autofocus="true" size="large" placeholder="https://..." />
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'add_project' })(AddProjectModal);
