import axios from 'axios';
import { PROJECT_SET } from './types';

export const set = data => {
  return dispatch => {

    dispatch({
      type: PROJECT_SET,
      payload: {
        id: data.id
      }
    });

  };
}