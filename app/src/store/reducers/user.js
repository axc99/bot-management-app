import { USER_SET } from '../actions/types';

const DEFAULT_STATE = {
  _id: '',
  username: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case USER_SET:
      return { ...state, _id: action.payload._id, username: action.payload.username }
    default:
      return state
  }
}
