import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './AppAuth';
import Main from './AppMain';

import authGuard from './HOCs/authGuard';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/auth/:type/" component={Auth} />
        <Route component={authGuard(Main)} />
      </Switch>
    </div>
  );
}

export default App;
