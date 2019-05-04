import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Icon } from 'antd';

import * as actions from '../../store/actions';

class SignInForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
              <Input className="app-form-field-input" name="password" htmlType="password" size="large" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">Войти в аккаунт</Button>
          </Form.Item>
        </div>
        <div className="app-form-links">
          <Link to="/auth/recovery/" className="app-form-link">Не можете войти?</Link>
        </div>
      </Form>
    )
  }
}

export default Form.create({ name: 'sign_in' })(SignInForm);
