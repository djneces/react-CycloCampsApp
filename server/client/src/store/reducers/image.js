import {
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_DELETE_START,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  imgLinks: null,
  isDeleting: false,
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
    case IMAGE_DELETE_START:
      return {
        ...state,
        error: null,
        isDeleting: true,
      };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imgLinks: payload,
      };
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      };
    case IMAGE_UPLOAD_FAIL:
    case IMAGE_DELETE_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
        imgLinks: null,
        isDeleting: false,
      };
    default:
      return state;
  }
};

export default userReducer;
