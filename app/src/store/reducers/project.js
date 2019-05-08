import { SET_PROJECT, UNSET_PROJECT } from '../actions/types';

const DEFAULT_STATE = {
  project: null
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_PROJECT:
      return { ...state, project: action.payload.project }
    case UNSET_PROJECT:
      return { ...state, project: null }
    default:
      return state
  }
}
