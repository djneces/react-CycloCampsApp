import {
  FETCH_ALL_CAMPGROUNDS,
  FETCH_ONE_CAMPGROUND,
  FETCH_CAMPGROUNDS_START,
  FETCH_CAMPGROUNDS_SUCCESS,
  FETCH_CAMPGROUNDS_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  campgrounds: [],
  selectedCampground: null,
  isLoading: false,
  allCampgrounds: null,
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
        campgrounds: payload.campgrounds,
        allCampgrounds: payload.allDocs,
      };
    case FETCH_ONE_CAMPGROUND:
      return {
        ...state,
        selectedCampground: payload,
      };
    case FETCH_CAMPGROUNDS_FAIL:
      return {
        ...state,
        campgrounds: [],
        selectedCampground: null,
        isLoading: false,
        allCampgrounds: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default campgroundReducer;
