import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './user';
import authReducer from './auth';
import projectReducer from './project';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  router: routerReducer,
  project: projectReducer
});
