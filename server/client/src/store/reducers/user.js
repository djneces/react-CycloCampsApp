import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  isDeleting: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_USER_START:
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      };
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
        isDeleting: false,
      };
    default:
      return state;
  }
};

export default userReducer;
