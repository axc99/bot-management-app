import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Icon, Modal } from 'antd';

import * as authActions from '../../store/actions/auth';

class SignInForm extends Component {
  async send(data) {
    await this.props.signIn(data);
    if (this.props.errorMessage || !this.props.isAuthenticated) {
      Modal.error({
        title: 'Ошибка',
        content: this.props.errorMessage ? this.props.errorMessage : 'Ошибка при отправке запроса.'
      });
    } else if (this.props.isAuthenticated) {
      this.props.history.push('/projects/');
    };
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
              {getFieldDecorator('email_or_username', {
                rules: [ { required: true, message: 'Укажите email или логин' } ],
              })(
                <Input autofocus="true" name="email_or_username" size="large" />
              )}
            </Form.Item>
            <Form.Item label="Пароль" className="app-form-field">
              {getFieldDecorator('password', {
                rules: [ { required: true, message: 'Укажите пароль' } ],
              })(
                <Input className="app-form-field-input" name="password" type="password" size="large" />
              )}
            </Form.Item>
          </div>
          <div className="app-form-btns">
            <Button className="app-form-btn" type="primary" htmlType="submit" size="large">Войти в аккаунт</Button>
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
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default compose(
  connect(mapStateToProps, authActions)
)(Form.create({ name: 'sign_in' })(SignInForm));
