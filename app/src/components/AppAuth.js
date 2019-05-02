import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { setTitle } from './../helpers.js';

class SignInForm extends Component {
  render() {
    return (
      <Form className="app-form">
        <div className="app-form-fields">
          <Form.Item>
            <Input placeholder="Email или логин" size="large" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Пароль" size="large" />
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Form.Item>
            <Button type="primary" size="large">Войти в аккаунт</Button>
          </Form.Item>
        </div>
        <div className="app-form-links">
          <Link to="/auth/recovery/" className="app-form-link">Забыли пароль?</Link><br />
          <a className="app-form-link" href="/">Политика конфеденциальности</a><br />
          <a className="app-form-link" href="/">Правила использования</a>
        </div>
      </Form>
    )
  }
}

export default class AppAuth extends Component {
  render() {

    var type = this.props.match.params.type
    var title, content, Form = null

    if (type == 'sign-in') {
      setTitle('Войти в аккаунт')
      Form = SignInForm
      content = (
        <div>
          <div class="app-auth-box-title">
            Войти в <b>ИС</b>
            <Link to="/auth/sign-up/" className="app-auth-box-title-link">Регистрация</Link>
          </div>
          <Form />
        </div>
      )
    } else if (type == 'sign-up') {
      setTitle('Создать аккаунт')
      content = (
        <div>
          <div class="app-auth-box-title">
            Регистрация в <b>ИС</b>
            <Link to="/auth/sign-in/" className="app-auth-box-title-link">Вход</Link>
          </div>
          [FORM]
        </div>
      )
    } else if (type == 'recovery') {
      setTitle('Восстановить аккаунт')
      content = (
        <div>
          <div class="app-auth-box-title">
            Восстановление доступа
            <Link to="/auth/sign-in/" className="app-auth-box-title-link">Вход</Link>
          </div>
          [FORM]
        </div>
      )
    } else if (type == 'change-password') {
      setTitle('Сменить пароль')
      content = (
        <div>
          <div class="app-auth-box-title">
            Смена пароля
          </div>
          [FORM]
        </div>
      )
    } else {
      content = <Redirect to="/auth/sign-in/" />
    }

    return (
      <div className="app-auth">

        <div className="app-vertical_equalizer">
        <div className="app-vertical_equalizer-table">
        <div className="app-vertical_equalizer-table-cell">

          <div className="app-auth-box">
            {content}
          </div>

        </div>
        </div>
        </div>

      </div>
    );
  }
}
