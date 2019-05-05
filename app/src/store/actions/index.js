import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR
} from './types';

export const signUp = data => {
  return async dispatch => {



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
    }).catch(err => {

      alert('err');
      console.log(err);

    });

    const resData = res.data;

    if (resData) {
      if (resData.error) {

        dispatch({
          type: AUTH_ERROR,
          payload: resData.error.message
        });

        alert('> err');

      } else {

        dispatch({
          type: AUTH_SIGN_UP,
          payload: resData.result.token
        });

        localStorage.setItem('JWT_TOKEN', resData.result.token);
        axios.defaults.headers.common['Authorization'] = resData.result.token;

        alert('> result');

      };
    };

    alert('pre !!!');

  };
}

export const signOut = () => {
  return dispatch => {

    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    alert('!!!');

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    });

  };
}
