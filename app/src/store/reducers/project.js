import { SET_PROJECT, UNSET_PROJECT } from '../actions/types';

const DEFAULT_STATE = null;

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_PROJECT:
      return { ...state, id: action.payload.id }
    case UNSET_PROJECT:
      return null
    default:
      return state
  }
}
