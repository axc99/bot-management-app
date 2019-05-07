import axios from 'axios';
import { USER_SET } from './types';

export const set = data => {
  return dispatch => {

    dispatch({
      type: USER_SET,
      payload: {
        id: data.id,
        username: data.username
      }
    });

  };
}
