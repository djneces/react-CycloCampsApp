import { combineReducers } from 'redux';
import authReducer from './auth';
import formReducer from './form';
import campgroundReducer from './camgrounds';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  campgrounds: campgroundReducer,
});
