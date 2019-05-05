import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Icon, Checkbox } from 'antd';

import * as actions from '../../store/actions';

class SignUpForm extends Component {

  async send(data) {

    await this.props.signIn(data);

    if (this.props.errorMessage) {
      Modal.error({
        title: 'Ошибка',
        content: this.props.errorMessage
      });
    } else {
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
              rules: [ { required: true, message: 'Укажите пароль ещё раз' } ],
            })(
              <Input className="app-form-field-input" name="confirm_password" type="password" size="large" />
            )}
          </Form.Item>
          <Form.Item className="app-form-agreement">
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [ { required: true, message: 'Ознакомтесь с правилами пользования.' } ]
            })(
              <Checkbox>Я ознакомился с <a href="#">привилами пользования</a></Checkbox>
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
  connect(mapStateToProps, actions)
)(Form.create({ name: 'sign_up' })(SignUpForm));
