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
      config.serverUrl + '/app-api/projects/', {
        project: data
      })
      .then((res) => {
        const project = res.data.project;
        this.props.close();
        this.props.history.push('/projects/' + project.id + '/leads/');
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Modal
        width={400}
        visible={this.props.visible}
        title={(<b>Создать проект</b>)}
        okText="Создать"
        cancelText="Отмена"
        onOk={this.handleSubmit}
        confirmLoading={this.state.sending}
        onCancel={this.props.close} >
        <Form hideRequiredMark="false" className="app-form" layout="vertical">
          <div className="app-form-fields">
            <Form.Item label="Название проекта" className="app-form-field">
              {form.getFieldDecorator('name', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input autoFocus={true} />
              )}
            </Form.Item>
            <Form.Item label="Ссылка на сайт" className="app-form-field">
              {form.getFieldDecorator('websiteUrl', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input placeholder="https://..." />
              )}
            </Form.Item>
          </div>
        </Form>

      </Modal>
    );
  }
}

export default Form.create({ name: 'addProject' })(AddProjectModal);
