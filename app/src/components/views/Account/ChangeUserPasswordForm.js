import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Tabs } from 'antd';

import * as userActions from '../../../store/actions/user';
import config from '../../../config';

class ChangePasswordForm extends React.Component {
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  async send(data) {
    this.showSending();
    axios.post(
      config.serverUrl + 'app-api/rpc/', {
        jsonrpc: '2.0',
        method: 'changePassword',
        params: {
          userId: this.props.user.id,
          password: data.password,
          newPassword: data.newPassword
        },
        id: 1
      })
      .then((res) => {
        const resData = res.data;
        if (resData.error) {
          Modal.error({
            title: (<b>Ошибка при смена пароля</b>),
            content: resData.error.message
          });
        } else if (resData.result) {
          Modal.success({
            title: (<b>Пароль изменен</b>),
            content: 'Вы успешно сменили пароль.'
          });
          this.props.form.resetFields();
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
      })
      .finally(() => this.hideSending());
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Пароль и его подтверждение должны совпадать.');
    } else {
      callback();
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Текущий пароль" className="app-form-field">
            {getFieldDecorator('password', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input className="app-form-field-input" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Новый пароль" className="app-form-field">
            {getFieldDecorator('newPassword', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input className="app-form-field-input" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Новый пароль ещё раз" className="app-form-field">
            {getFieldDecorator('confirmNewPassword', {
              rules: [
                { required: true, message: 'Поле обязательно для заполнения.' },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input className="app-form-field-input" type="password" size="large" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Сменить пароль</Button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: {
      id: state.user.id
    }
  }
}

export default connect(mapStateToProps, userActions)(Form.create({ name: 'change_password' })(ChangePasswordForm));
