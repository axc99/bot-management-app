import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user'
import projectReducer from './project'

export default combineReducers({
  user: userReducer,
  project: projectReducer,
  router: routerReducer
})
