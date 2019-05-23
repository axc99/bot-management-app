import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Input, Checkbox, Modal } from 'antd';

import { setTitle } from '../../helpers';
import config from '../../config';

class SignUpForm extends Component {
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
      config.serverUrl + '/app-api/rpc/', {
        jsonrpc: '2.0',
        method: 'signUp',
        params: {
          email: data.email,
          password: data.password
        },
        id: 1
      })
      .then((res) => {
        if (res.data.error) {
          Modal.error({
            title: 'Ошибка при регистрации',
            content: res.data.error.message
          });
        } else if (res.data.result) {
          Modal.success({
            title: 'Аккаунт создан',
            content: 'Вы можете войти в свой аккаунт.'
          });
          this.props.history.push('/auth/sign-in/?email='+data.email);
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
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
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
          <Form.Item label="E-mail" className="app-form-field">
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'Укажите email адрес.', },
                { max: 250, message: 'Email не может быть больше 250 символов.' },
                { required: true, message: 'Email обязателен для заполнения.' }
              ]
            })(
              <Input autoFocus={true} size="large" />
            )}
          </Form.Item>
          <Form.Item label="Пароль" className="app-form-field">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Пароль обязателен для заполнения.' },
                { min: 5, message: 'Пароль не может быть меньше 5 символов.' },
                { max: 150, message: 'Пароль не может быть больше 150 символов.' }
              ]
            })(
              <Input className="app-form-field-input" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Пароль ещё раз" className="app-form-field">
            {getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: 'Пароль обязателен для заполнения.' },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input className="app-form-field-input" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item className="app-form-agreement">
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [ { required: true, message: 'Примите правила пользования.' } ]
            })(
              <Checkbox>Я принимаю <a href="#">привила пользования</a></Checkbox>
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Создать аккаунт</Button>
        </div>
      </Form>
    )
  }
}

SignUpForm = Form.create({ name: 'signUp' })(SignUpForm);

export default class SignUp extends React.Component {
  componentDidMount() {
    setTitle('Создать аккаунт');
  }
  render() {
    return (
      <div>
        <div className="app-auth-box-title">
          Регистрация в <b>ИС</b>
          <Link to="/auth/sign-in/" className="app-auth-box-title-link">Вход</Link>
        </div>
        <SignUpForm history={this.props.history} />
      </div>
    );
  }
}
