import React from 'react';
import axios from 'axios';
import { Form, Input, Select, Modal } from 'antd';
import validator from 'validator';

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
        if (res.data.project) {
          this.props.close();
          this.props.history.push('/projects/' + res.data.project.id + '/leads/');
          Modal.success({
            title: 'Проект создан',
            content: 'Вы успешно создали проект.'
          });
        };
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
  checkURL = (rule, value, callback) => {
    const form = this.props.form;
    const url = form.getFieldValue('websiteUrl');
    if (url && !validator.isURL(url)) callback('Укажите ссылку на страницу.');
    else callback();
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
                rules: [
                  { required: true, message: 'Название обязательно для заполнения.' },
                  { max: 30, message: 'Название не может быть длиннее 30 символов.' }
                ]
              })(
                <Input autoFocus={true} />
              )}
            </Form.Item>
            <Form.Item label="Ссылка на страницу" className="app-form-field">
              {form.getFieldDecorator('websiteUrl', {
                rules: [
                  { max: 100, message: 'Ссылка не может быть длиннее 100 символов.' },
                  { validator: this.checkURL }
                ]
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
