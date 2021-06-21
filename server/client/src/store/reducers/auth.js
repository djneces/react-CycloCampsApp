import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  FETCH_USER,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        isAuthenticated: null,
        isLoading: true,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
