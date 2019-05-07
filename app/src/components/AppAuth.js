import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import SignInForm from './AppAuth/SignInForm';
import SignUpForm from './AppAuth/SignUpForm';
import RecoveryForm from './AppAuth/RecoveryForm';

import { setTitle } from '../helpers';

export default class AppAuth extends Component {
  render() {
    var type = this.props.match.params.type;
    var title, content, Form = null;

    if (type == 'sign-in') {
      setTitle('Войти в аккаунт');
      content = (
        <div>
          <div className="app-auth-box-title">
            Войти в <b>ИС</b>
            <Link to="/auth/sign-up/" className="app-auth-box-title-link">Регистрация</Link>
          </div>
          <SignInForm history={this.props.history} />
        </div>
      );
    } else if (type == 'sign-up') {
      setTitle('Создать аккаунт');
      content = (
        <div>
          <div className="app-auth-box-title">
            Регистрация в <b>ИС</b>
            <Link to="/auth/sign-in/" className="app-auth-box-title-link">Вход</Link>
          </div>
          <SignUpForm history={this.props.history} />
        </div>
      );
    } else if (type == 'recovery') {
      setTitle('Восстановить доступ');
      content = (
        <div>
          <div className="app-auth-box-title">
            Восстановление доступа
            <Link to="/auth/sign-in/" className="app-auth-box-title-link">Вход</Link>
          </div>
          [FORM]
        </div>
      )
    } else if (type == 'change-password') {
      content = (
        <div>
          <div className="app-auth-box-title">
            Смена пароля
          </div>
          [FORM]
        </div>
      );
    } else {
      content = (<Redirect to="/auth/sign-in/" />);
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
