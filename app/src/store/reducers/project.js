import {
  PROJECT_SET,
  PROJECT_UNSET } from '../actions/types';

const DEFAULT_STATE = {
  id: null
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PROJECT_SET:
      return { ...state, id: action.payload.id }
    case PROJECT_UNSET:
      return { ...state }
    default:
      return state
  }
}
