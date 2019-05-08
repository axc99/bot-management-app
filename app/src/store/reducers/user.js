import { USER_SET } from '../actions/types';

const DEFAULT_STATE = {
  id: '',
  username: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case USER_SET:
      return { ...state, id: action.payload.id, username: action.payload.username }
    default:
      return state
  }
}
