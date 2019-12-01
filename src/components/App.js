import React from 'react'
import { Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import Auth from './AppAuth'
import Main from './AppMain'

import accessGuard from './HOCs/accessGuard'

function App () {
  return (
    <div className='app'>
      <Switch>
        <Route path='/auth/' component={Auth} />
        <Route exact path='/' render={() => { return <Redirect to='/auth/sign-in/' /> }} />
        <Route component={accessGuard(Main)} />
      </Switch>
    </div>
  )
}

export default App
