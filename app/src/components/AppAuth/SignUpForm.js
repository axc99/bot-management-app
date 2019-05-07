import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Icon, Checkbox, Modal } from 'antd';

import * as authActions from '../../store/actions/auth';

class SignUpForm extends Component {
  async send(data) {
    await this.props.signUp(data);
    if (this.props.errorMessage || !this.props.isAuthenticated) {
      Modal.error({
        title: 'Ошибка',
        content: this.props.errorMessage ? this.props.errorMessage : 'Ошибка при отправке запроса.'
      });
    } else if (this.props.isAuthenticated) {
      Modal.success({
        title: (<b>Подтвердите вашу почту</b>),
        content: 'Для продолжения регистрации, Вам необходимо перейти по ссылке, которая была отправленна вам на почту... FIX'
      });
      this.props.history.push('/auth/sign-in/');
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароль и его подтверждение должны совпадать.');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="E-mail" className="app-form-field">
            {getFieldDecorator('email', {
              rules: [ { required: true, message: 'Укажите email' } ],
            })(
              <Input autofocus="true" name="email" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Пароль" className="app-form-field">
            {getFieldDecorator('password', {
              rules: [ { required: true, message: 'Укажите пароль' } ],
            })(
              <Input className="app-form-field-input" name="password" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Пароль ещё раз" className="app-form-field">
            {getFieldDecorator('confirm_password', {
              rules: [
                { required: true, message: 'Укажите пароль ещё раз' },
                { validator: this.compareToFirstPassword }
              ],
            })(
              <Input className="app-form-field-input" name="confirm_password" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item className="app-form-agreement">
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [ { required: true, message: 'Примите правила пользования.' } ]
            })(
              <Checkbox>Я принимаю <a href="#">привилами пользования</a></Checkbox>
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit" size="large">Создать аккаунт</Button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps(state) {

  console.log(state);
  return {
    location: state.router.location,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default compose(
  connect(mapStateToProps, authActions)
)(Form.create({ name: 'sign_up' })(SignUpForm));
