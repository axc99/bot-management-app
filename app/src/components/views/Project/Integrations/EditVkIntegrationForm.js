import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select, Modal } from 'antd';

import config from '../../../../config';

class EditVkIntegrationForm extends React.Component {
  state = {
    sending: false,
    integrationState: (this.props.project && this.props.project.integrations.vk) ? this.props.project.integrations.vk.state : 0
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
    axios.patch(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        project: {
          'integrations.vk.state': data.state,
          'integrations.vk.accessToken': data.accessToken
        }
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: (<b>Изменения сохранены</b>)
          });
        };
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  handleIntegrationStateChange = (value) => {
    this.setState({ integrationState: value });
  }
  render() {
    const { form, project } = this.props;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Состояние" className="app-form-field">
            {form.getFieldDecorator('state', {
              initialValue: (project && project.integrations.vk) ? project.integrations.vk.state.toString() : '0',
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Select onChange={this.handleIntegrationStateChange} style={{ width: 250 }}>
                <Select.Option value="0">Не активно</Select.Option>
                <Select.Option value="1">Активно</Select.Option>
                <Select.Option value="2">Активно (без сбора лидов)</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Ключ доступа" className="app-form-field">
            {form.getFieldDecorator('accessToken', {
              rules: [ { required: this.state.integrationState > 0, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input disabled={this.state.integrationState == 0} placeholder="{access_token}" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
        </div>
        <div className="app-form-links">
          <a target="_blank" href="https://vk.com/dev/bots_docs?f=1.1.%2B%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%2B%D0%BA%D0%BB%D1%8E%D1%87%D0%B0%2B%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0" className="app-form-link">API для чат-ботов | Как получить ключ доступа?</a>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  const project = props.project;
  if (!(project && project.integrations && project.integrations.vk)) return;
  return {
    accessToken: Form.createFormField({
      value: project.integrations.vk.accessToken
    })
  }
}

export default Form.create({ name: 'editVkIntegration', mapPropsToFields })(EditVkIntegrationForm);
