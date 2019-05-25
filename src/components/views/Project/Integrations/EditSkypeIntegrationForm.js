import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select, Modal } from 'antd';

import config from '../../../../config';

class EditSkypeIntegrationForm extends React.Component {
  state = {
    sending: false,
    integrationState: (this.props.project && this.props.project.integrations && this.props.project.integrations.skype) ? this.props.project.integrations.skype.state : 0
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
          'integrations.skype.state': data.state,
          'integrations.skype.appId': data.appId,
          'integrations.skype.appPassword': data.appPassword
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
              initialValue: (project && project.integrations && project.integrations.skype) ? project.integrations.skype.state.toString() : '0',
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Select onChange={this.handleIntegrationStateChange} defaultValue="1" style={{ width: 250 }}>
                <Select.Option value="0">Не активно</Select.Option>
                <Select.Option value="1">Активно</Select.Option>
                <Select.Option value="2">Активно (без сбора лидов)</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Идентификатор приложения" className="app-form-field">
            {form.getFieldDecorator('appId', {
              rules: [ { required: this.state.integrationState > 0, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input disabled={this.state.integrationState == 0} placeholder="" />
            )}
          </Form.Item>
          <Form.Item label="Пароль" className="app-form-field">
            {form.getFieldDecorator('appPassword', {
              rules: [ { required: this.state.integrationState > 0, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input disabled={this.state.integrationState == 0} placeholder="" />
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
  if (!(project && project.integrations && project.integrations.skype)) return;
  return {
    appId: Form.createFormField({
      value: project.integrations.skype.appId
    }),
    appPassword: Form.createFormField({
      value: project.integrations.skype.appPassword
    })
  }
}

export default Form.create({ name: 'editSkypeIntegration', mapPropsToFields })(EditSkypeIntegrationForm);
