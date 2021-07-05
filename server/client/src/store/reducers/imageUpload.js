import {
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  imgLinks: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case IMAGE_UPLOAD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        imgLinks: null,
      };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imgLinks: payload,
      };
    case IMAGE_UPLOAD_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
        imgLinks: null,
      };
    default:
      return state;
  }
};

export default userReducer;
