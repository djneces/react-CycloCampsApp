import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
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
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
