import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, Modal } from 'antd';

import * as userActions from '../../store/actions/user';

import { setTitle } from '../../helpers';
import config from '../../config';

class SignInForm extends Component {
  state = {
    loading: false
  }
  showLoading() {
    this.setState({ loading: true });
  }
  hideLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  async send(data) {
    this.showLoading();
    axios.post(
      config.serverUrl + 'app-api/rpc/', {
        jsonrpc: '2.0',
        method: 'signIn',
        params: {
          emailOrUsername: data.emailOrUsername,
          password: data.password
        },
        id: 1
      })
      .then((res) => {
        const resData = res.data;
        if (resData.error) {
          Modal.error({
            title: (<b>Ошибка при входе</b>),
            content: resData.error.message
          });
        } else if (resData.result) {
          this.props.setUser({
            id: resData.result.user.id,
            session: {
              accessToken: resData.result.user.session.accessToken
            }
          });
          this.props.history.push('/projects/');
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
      })
      .finally(() => this.hideLoading());
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
      <div>
        <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
          <div className="app-form-fields">
            <Form.Item label="E-mail или логин" className="app-form-field">
              {getFieldDecorator('emailOrUsername', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input autoFocus={true} size="large" />
              )}
            </Form.Item>
            <Form.Item label="Пароль" className="app-form-field">
              {getFieldDecorator('password', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input className="app-form-field-input" type="password" size="large" />
              )}
            </Form.Item>
          </div>
          <div className="app-form-btns">
            <Button loading={this.state.loading} className="app-form-btn" type="primary" htmlType="submit" size="large">Войти в аккаунт</Button>
          </div>
          <div className="app-form-links">
            <Link to="/auth/recovery/" className="app-form-link">Забыли пароль?</Link>
          </div>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

SignInForm = connect(mapStateToProps, userActions)(Form.create({ name: 'signIn' })(SignInForm));

export default class SignIn extends React.Component {
  componentDidMount() {
    setTitle('Войти в аккаунт');
  }
  render() {
    return (
      <div>
        <div className="app-auth-box-title">
          Войти в <b>ИС</b>
          <Link to="/auth/sign-up/" className="app-auth-box-title-link">Регистрация</Link>
        </div>
        <SignInForm history={this.props.history} />
      </div>
    );
  }
}
