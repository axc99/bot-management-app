import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import axios from 'axios';

const userId = localStorage.getItem('USER_ID');
const accessToken = localStorage.getItem('ACCESS_TOKEN');
axios.defaults.headers.common['Authorization'] = accessToken;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const store = createStore(reducers, {
  user: {
    isAuthenticated: (userId && accessToken) ? true : false,
    id: userId,
    session: {
      accessToken: accessToken
    }
  }
}, applyMiddleware(reduxThunk));

// const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
