import {
  FETCH_ALL_CAMPGROUNDS,
  FETCH_ONE_CAMPGROUND_START,
  FETCH_ONE_CAMPGROUND_SUCCESS,
  FETCH_ONE_CAMPGROUND_FAIL,
  FETCH_CAMPGROUNDS_START,
  FETCH_CAMPGROUNDS_SUCCESS,
  FETCH_CAMPGROUNDS_FAIL,
  FETCH_ALL_CAMPGROUNDS_BY_USER,
  DELETE_CAMPGROUND_START,
  DELETE_CAMPGROUND_SUCCESS,
  DELETE_CAMPGROUND_FAIL,
  SUBMIT_EDITED_CAMPGROUND_START,
  SUBMIT_EDITED_CAMPGROUND_SUCCESS,
  SUBMIT_EDITED_CAMPGROUND_FAIL,
  FETCH_ONE_CAMPGROUND_COORDS,
  CREATE_NEW_CAMPGROUND_START,
  CREATE_NEW_CAMPGROUND_SUCCESS,
  CREATE_NEW_CAMPGROUND_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  campgrounds: [],
  selectedCampground: { campground: null, isLoading: false, coords: null },
  isLoading: false,
  isDeleting: false,
  isEditing: false,
  isCreating: false,
  allCampgrounds: null,
  usersCampgrounds: { campgrounds: [], results: null },
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
    case DELETE_CAMPGROUND_START:
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case FETCH_ONE_CAMPGROUND_START:
      return {
        ...state,
        selectedCampground: { ...state.selectedCampground, isLoading: true },
        error: null,
      };
    case SUBMIT_EDITED_CAMPGROUND_START:
      return {
        ...state,
        isEditing: true,
        error: null,
      };
    case CREATE_NEW_CAMPGROUND_START:
      return {
        ...state,
        isCreating: true,
        error: null,
      };
    case FETCH_CAMPGROUNDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_CAMPGROUND_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      };
    case SUBMIT_EDITED_CAMPGROUND_SUCCESS:
      return {
        ...state,
        isEditing: false,
      };
    case CREATE_NEW_CAMPGROUND_SUCCESS:
      return {
        ...state,
        isCreating: false,
      };
    case FETCH_ALL_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: payload.campgrounds,
        allCampgrounds: payload.allDocs,
      };
    case FETCH_ALL_CAMPGROUNDS_BY_USER:
      return {
        ...state,
        usersCampgrounds: {
          ...state.usersCampgrounds,
          campgrounds: payload.campgrounds,
          results: payload.results,
        },
      };
    case FETCH_ONE_CAMPGROUND_SUCCESS:
      return {
        ...state,
        selectedCampground: {
          ...state.selectedCampground,
          campground: payload,
          isLoading: false,
        },
      };
    case FETCH_ONE_CAMPGROUND_COORDS:
      return {
        ...state,
        selectedCampground: {
          ...state.selectedCampground,
          coords: payload,
        },
      };
    case FETCH_CAMPGROUNDS_FAIL:
    case DELETE_CAMPGROUND_FAIL:
    case SUBMIT_EDITED_CAMPGROUND_FAIL:
    case CREATE_NEW_CAMPGROUND_FAIL:
      return {
        ...state,
        campgrounds: [],
        isLoading: false,
        isDeleting: false,
        isEditing: false,
        isCreating: false,
        allCampgrounds: null,
        error: payload,
      };
    case FETCH_ONE_CAMPGROUND_FAIL:
      return {
        ...state,
        selectedCampground: {
          ...state.selectedCampground,
          campground: null,
          isLoading: false,
        },
        error: payload,
      };
    default:
      return state;
  }
};

export default campgroundReducer;
