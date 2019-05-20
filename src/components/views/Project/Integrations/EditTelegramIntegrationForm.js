import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select, Modal } from 'antd';

import config from '../../../../config';

class EditTelegramIntegrationForm extends React.Component {
  state = {
    sending: false,
    integrationState: (this.props.project && this.props.project.integrations && this.props.project.integrations.telegram) ? this.props.project.integrations.telegram.state : 0
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
          'integrations.telegram.state': data.state,
          'integrations.telegram.accessToken': data.accessToken
        }
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: 'Изменения сохранены'
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
              initialValue: (project && project.integrations && project.integrations.telegram) ? project.integrations.telegram.state.toString() : '0',
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Select onChange={this.handleIntegrationStateChange} defaultValue="1" style={{ width: 250 }}>
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
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  const project = props.project;
  if (!(project && project.integrations && project.integrations.telegram)) return;
  return {
    accessToken: Form.createFormField({
      value: project.integrations.telegram.accessToken
    })
  }
}

export default Form.create({ name: 'editTelegramIntegration', mapPropsToFields })(EditTelegramIntegrationForm);
