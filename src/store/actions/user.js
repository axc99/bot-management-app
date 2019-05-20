import axios from 'axios';
import { SET_USER, UNSET_USER } from './types';

export const setUser = data => {
  return dispatch => {
    localStorage.setItem('USER_ID', data.id);
    localStorage.setItem('ACCESS_TOKEN', data.session.accessToken);
    axios.defaults.headers.common['Authorization'] = data.session.accessToken;
    dispatch({
      type: SET_USER,
      payload: {
        isAuthenticated: true,
        id: data.id,
        username: data.username,
        session: data.session
      }
    });
  };
}

export const unsetUser = data => {
  return dispatch => {
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('ACCESS_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';
    dispatch({
      type: UNSET_USER,
      payload: {
        isAuthenticated: false,
        user: null
      }
    });
  };
}
