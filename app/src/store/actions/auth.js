import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  USER_SET
} from './types';

export const signUp = data => {
  return async dispatch => {

    const res = await axios.post('http://localhost./app-api/rpc/', {
      jsonrpc: '2.0',
      method: 'signUp',
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
      method: 'signIn',
      params: {
        emailOrUsername: data.emailOrUsername,
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
          type: AUTH_SIGN_IN,
          payload: resData.result.accessToken
        });

        localStorage.setItem('JWT_TOKEN', resData.result.accessToken);
        axios.defaults.headers.common['Authorization'] = resData.result.accessToken;

        dispatch({
          type: USER_SET,
          payload: {
            id: resData.result.user.id,
            username: resData.result.user.username
          }
        });

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
