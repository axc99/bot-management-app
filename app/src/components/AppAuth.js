import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import SignIn from './AppAuth/SignIn';
import SignUp from './AppAuth/SignUp';
import Recovery from './AppAuth/Recovery';

export default class AppAuth extends Component {
  render() {
    var type = this.props.match.params.type;
    var title, content, Form = null;

    /*if (type == 'sign-up') {
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
    }*/

    return (
      <div className="app-auth">

        <div className="app-vertical_equalizer">
        <div className="app-vertical_equalizer-table">
        <div className="app-vertical_equalizer-table-cell">

          <div className="app-auth-box">
            <Switch>
              <Route path="/auth/sign-in/" component={SignIn} />
              <Route path="/auth/sign-up/" component={SignUp} />
              <Route path="/auth/recovery/" component={Recovery} />
            </Switch>
          </div>

        </div>
        </div>
        </div>

      </div>
    );
  }
}
