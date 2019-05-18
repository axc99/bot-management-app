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
