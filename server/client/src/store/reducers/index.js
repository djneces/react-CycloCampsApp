import { combineReducers } from 'redux';
import authReducer from './auth';
import formReducer from './form';
import campgroundReducer from './campgrounds';
import reviewReducer from './review';
import userReducer from './user';
import imageUploadReducer from './image';
import alertReducer from './alert';
import emailReducer from './email';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  campgrounds: campgroundReducer,
  review: reviewReducer,
  user: userReducer,
  image: imageUploadReducer,
  alert: alertReducer,
  email: emailReducer,
});
