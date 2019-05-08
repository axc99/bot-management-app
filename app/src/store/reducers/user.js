import { SET_USER, UNSET_USER } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  id: null,
  session: null
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_USER:
      return { ...state, isAuthenticated: true, id: action.payload.id, session: action.payload.session }
    case UNSET_USER:
      return { ...state, isAuthenticated: false, id: null, session: false }
    default:
      return state
  }
}
