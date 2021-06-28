import { combineReducers } from 'redux';
import authReducer from './auth';
import formReducer from './form';
import campgroundReducer from './campgrounds';
import reviewReducer from './review';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  campgrounds: campgroundReducer,
  review: reviewReducer,
});
