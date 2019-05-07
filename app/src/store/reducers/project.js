import { PROJECT_SET } from '../actions/types';

const DEFAULT_STATE = {
  _id: '',
  name: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PROJECT_SET:
      return { ...state, _id: action.payload._id, name: action.payload.name }
    default:
      return state
  }
}
