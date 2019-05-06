import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  PROJECT_SET,
  PROJECT_UNSET
} from './types';

export const signUp = data => {
  return async dispatch => {

    const res = await axios.post('http://localhost./app-api/rpc/', {
      jsonrpc: '2.0',
      method: 'sign_up',
      params: {
        email: data.email,
        password: data.password
      },
      id: 1
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(err => { console.log(err) });

    const resData = res ? res.data : {};

    if (resData) {
      if (resData.error) {

        dispatch({
          type: AUTH_ERROR,
          payload: resData.error.message
        });

      };
    };

  };
}

export const signIn = data => {
  return async dispatch => {

    const res = await axios.post('http://localhost./app-api/rpc/', {
      jsonrpc: '2.0',
      method: 'sign_in',
      params: {
        email_or_username: data.email_or_username,
        password: data.password
      },
      id: 1
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(err => { console.log(err) });

    const resData = res ? res.data : {};

    if (resData) {
      if (resData.error) {

        dispatch({
          type: AUTH_ERROR,
          payload: resData.error.message
        });

      } else if (resData.result) {

        dispatch({
          type: AUTH_SIGN_UP,
          payload: resData.result.token
        });

        localStorage.setItem('JWT_TOKEN', resData.result.token);
        axios.defaults.headers.common['Authorization'] = resData.result.token;

      };
    };

  };
}

export const signOut = () => {
  return dispatch => {

    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    });

  };
}

export const set = data => {
  return dispatch => {

    dispatch({
      type: PROJECT_SET,
      payload: {
        id: data.id,
        name: data.name
      }
    });

  };
}

export const unset = () => {
  return dispatch => {

    dispatch({
      type: PROJECT_UNSET,
      payload: ''
    });

  };
}
