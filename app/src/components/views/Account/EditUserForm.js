import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Spin, Form, Button, Input, Modal, Tabs } from 'antd';

import config from '../../../config';

class EditForm extends React.Component {
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
    axios.patch(
      config.serverUrl + 'app-api/users/' + this.props.user.id + '/', {
        user: data
      })
      .then((res) => {
        if (res.data.user) {
          Modal.success({
            title: (<b>Изменения сохранены</b>)
          });
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <Spin spinning={!this.props.user} size="large">
          <div className="app-form-fields">
            <Form.Item label="Логин" className="app-form-field">
              {getFieldDecorator('username')(
                <Input disabled="true" size="large" />
              )}
            </Form.Item>
            <Form.Item label="E-mail" className="app-form-field">
              {getFieldDecorator('email')(
                <Input disabled="true" size="large" />
              )}
            </Form.Item>
            <Form.Item label="Фамилия" className="app-form-field">
              {getFieldDecorator('lastName', {
                rules: [ { message: 'Заполните это поле.' } ],
              })(
                <Input size="large" />
              )}
            </Form.Item>
            <Form.Item label="Имя" className="app-form-field">
              {getFieldDecorator('firstName', {
                rules: [ { message: 'Заполните это поле.' } ],
              })(
                <Input size="large" />
              )}
            </Form.Item>
          </div>
          <div className="app-form-btns">
            <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Сохранить</Button>
          </div>
        </Spin>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  return props.user ? {
    username: Form.createFormField({
      value: props.user.username
    }),
    email: Form.createFormField({
      value: props.user.email
    }),
    firstName: Form.createFormField({
      value: props.user.firstName
    }),
    lastName: Form.createFormField({
      value: props.user.lastName
    })
  } : {};
}

export default Form.create({ name: 'edit_user', mapPropsToFields })(EditForm);
