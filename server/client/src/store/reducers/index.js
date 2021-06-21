import { combineReducers } from 'redux';
import authReducer from './auth';
import formReducer from './form';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
