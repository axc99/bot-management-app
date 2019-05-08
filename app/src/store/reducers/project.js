import { PROJECT_SET } from '../actions/types';

const DEFAULT_STATE = {
  id: '',
  name: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PROJECT_SET:
      return { ...state, id: action.payload.id, name: action.payload.name }
    default:
      return state
  }
}
