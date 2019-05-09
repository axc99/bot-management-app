import axios from 'axios';
import { SET_PROJECT, UNSET_PROJECT } from './types';

export const setProject = data => {
  return dispatch => {
    dispatch({
      type: SET_PROJECT,
      payload: {
        id: data.id
      }
    });
  };
}

export const unsetProject = data => {
  return dispatch => {
    dispatch({
      type: UNSET_PROJECT,
      payload: {}
    });
  };
}
