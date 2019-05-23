import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Tabs } from 'antd';

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
      config.serverUrl + '/app-api/users/' + this.props.user.id + '/', {
        user: data
      })
      .then((res) => {
        if (res.data.error) {
          Modal.error({
            title: 'Ошибка',
            content: res.data.error.message
          });
        } else if (res.data.user) {
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
  render() {
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Логин" className="app-form-field">
            {form.getFieldDecorator('username')(
              <Input disabled="true" />
            )}
          </Form.Item>
          <Form.Item label="E-mail" className="app-form-field">
            {form.getFieldDecorator('email')(
              <Input disabled="true" />
            )}
          </Form.Item>
          <Form.Item label="Фамилия" className="app-form-field">
            {form.getFieldDecorator('lastName', {
              rules: [
                { max: 50, message: 'Поле не может быть длиннее 50 символов.' }
              ]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Имя" className="app-form-field">
            {form.getFieldDecorator('firstName', {
              rules: [
                { max: 50, message: 'Поле не может быть длиннее 50 символов.' }
              ]
            })(
              <Input />
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
  const user = props.user;
  if (user) {
    return {
      username: Form.createFormField({
        value: user.username
      }),
      email: Form.createFormField({
        value: user.email
      }),
      firstName: Form.createFormField({
        value: user.firstName
      }),
      lastName: Form.createFormField({
        value: user.lastName
      })
    }
  };
}

export default Form.create({ name: 'editUser', mapPropsToFields })(EditForm);
