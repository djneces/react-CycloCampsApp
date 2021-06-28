import {
  SUBMIT_REVIEW_START,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  DELETE_REVIEW_START,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  FETCH_ONE_REVIEW_START,
  FETCH_ONE_REVIEW_SUCCESS,
  FETCH_ONE_REVIEW_FAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isDeleting: false,
  error: null,
  selectedReview: null,
};

const reviewReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_REVIEW_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ONE_REVIEW_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        selectedReview: null,
      };
    case DELETE_REVIEW_START:
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ONE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedReview: payload,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      };
    case SUBMIT_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case DELETE_REVIEW_FAIL:
    case FETCH_ONE_REVIEW_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: payload,
        selectedReview: null,
      };
    default:
      return state;
  }
};

export default reviewReducer;
