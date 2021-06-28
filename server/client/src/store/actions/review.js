import axios from 'axios';
import { clearForm, fetchFormData } from './form';
import { fetchOneCampground } from './campgrounds';
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
} from './actionTypes';

// Start submitting review
export const submitReviewStart = () => ({
  type: SUBMIT_REVIEW_START,
});

// Submit review success
export const submitReviewSuccess = () => {
  return {
    type: SUBMIT_REVIEW_SUCCESS,
  };
};

// Submit review fail
export const submitReviewFail = (error) => ({
  type: SUBMIT_REVIEW_FAIL,
  payload: error,
});

// Submit review
export const submitReview =
  (campgroundId, review, rating) => async (dispatch) => {
    dispatch(submitReviewStart());

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    axios
      .post(
        `/api/campgrounds/${campgroundId}/reviews`,
        { review, rating },
        options
      )
      .then((res) => {
        if (res.status === 201) {
          //wait until it's successfully fetched
          return dispatch(submitReviewSuccess());
        } else {
          new Error('Something went wrong');
        }
      })
      .then(() => {
        dispatch(clearForm());
        dispatch(fetchOneCampground(campgroundId));
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          //dispatch message on error response obj
          dispatch(submitReviewFail(error.response.data.message));
        } else {
          dispatch(submitReviewFail(error.message));
        }
      });
  };
//******************************* *
// Edit review
export const updateReview =
  (campgroundId, reviewId, review, rating) => async (dispatch) => {
    dispatch(submitReviewStart());

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    axios
      .patch(
        `/api/campgrounds/${campgroundId}/reviews/${reviewId}`,
        { review, rating },
        options
      )
      .then((res) => {
        if (res.status === 200) {
          return dispatch(submitReviewSuccess());
        } else {
          new Error('Something went wrong');
        }
      })
      .then(() => {
        dispatch(clearForm());
        dispatch(fetchOneCampground(campgroundId));
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(submitReviewFail(error.response.data.message));
        } else {
          dispatch(submitReviewFail(error.message));
        }
      });
  };
//******************************* *
// Start fetching a review
export const fetchOneReviewStart = () => ({
  type: FETCH_ONE_REVIEW_START,
});

// Fetch one review success
export const fetchOneReviewSuccess = (review) => {
  return {
    type: FETCH_ONE_REVIEW_SUCCESS,
    payload: review,
  };
};

// Fetch one review fail
export const fetchOneReviewFail = (error) => ({
  type: FETCH_ONE_REVIEW_FAIL,
  payload: error,
});

// Fetch one review
export const fetchOneReview = (campgroundId, reviewId) => async (dispatch) => {
  dispatch(fetchOneReviewStart());
  axios
    .get(`/api/campgrounds/${campgroundId}/reviews/${reviewId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(
          fetchFormData({
            review: res.data.data.review,
            rating: res.data.data.rating,
          })
        );
        return dispatch(fetchOneReviewSuccess(res.data.data));
      } else {
        new Error('Something went wrong');
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(fetchOneReviewFail(error.response.data.message));
      } else {
        dispatch(fetchOneReviewFail(error.message));
      }
    });
};

//******************************* */
// Start deleting review
export const deleteReviewStart = () => ({
  type: DELETE_REVIEW_START,
});

// Delete review success
export const deleteReviewSuccess = () => {
  return {
    type: DELETE_REVIEW_SUCCESS,
  };
};

// Delete review fail
export const deleteReviewFail = (error) => ({
  type: DELETE_REVIEW_FAIL,
  payload: error,
});

// Delete review
export const deleteReview = (campgroundId, reviewId) => async (dispatch) => {
  dispatch(deleteReviewStart());
  axios
    .delete(`/api/campgrounds/${campgroundId}/reviews/${reviewId}`)
    .then((res) => {
      //TODO alert
      dispatch(deleteReviewSuccess());
    })
    .then(() => {
      dispatch(fetchOneCampground(campgroundId));
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(deleteReviewFail(error.response.data.message));
        //TODO alert
      } else {
        console.error(error.message);
        dispatch(dispatch(deleteReviewFail(error.message)));
      }
    });
};
