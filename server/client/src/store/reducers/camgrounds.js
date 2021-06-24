import {
  FETCH_ALL_CAMPGROUNDS,
  FETCH_CAMPGROUNDS_START,
  FETCH_CAMPGROUNDS_SUCCESS,
  FETCH_CAMPGROUNDS_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  campgrounds: [],
  isLoading: false,
  error: null,
};

const campgroundReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CAMPGROUNDS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CAMPGROUNDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: payload,
      };
    case FETCH_CAMPGROUNDS_FAIL:
      return {
        ...state,
        campgrounds: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default campgroundReducer;
