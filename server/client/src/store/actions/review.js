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
  SUBMIT_EDITED_REVIEW_START,
  SUBMIT_EDITED_REVIEW_SUCCESS,
  SUBMIT_EDITED_REVIEW_FAIL,
} from './actionTypes';

import { setAlert } from './alert';

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
          dispatch(setAlert('Submit Review', `Something went wrong`, 'DANGER'));
        }
      })
      .then(() => {
        dispatch(clearForm());
        dispatch(fetchOneCampground(campgroundId, 'noFormDataFetch'));
        dispatch(
          setAlert('Submit Review', `Review successfully submitted`, 'SUCCESS')
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          //dispatch message on error response obj
          dispatch(submitReviewFail(error.response.data.message));
          dispatch(
            setAlert(
              'Submit Review',
              `${error.response.data.message}`,
              'DANGER'
            )
          );
        } else {
          dispatch(submitReviewFail(error.message));
          dispatch(setAlert('Submit Review', `Something went wrong`, 'DANGER'));
        }
      });
  };
//******************************* *
// Start submitting edited review
export const submitEditedReviewStart = () => ({
  type: SUBMIT_EDITED_REVIEW_START,
});

// Submit edited review success
export const submitEditedReviewSuccess = () => {
  return {
    type: SUBMIT_EDITED_REVIEW_SUCCESS,
  };
};

// Submit edited review fail
export const submitEditedReviewFail = (error) => ({
  type: SUBMIT_EDITED_REVIEW_FAIL,
  payload: error,
});

// Edit review
export const updateReview =
  (campgroundId, reviewId, review, rating) => async (dispatch) => {
    dispatch(submitEditedReviewStart());

    const options = {
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
          return dispatch(submitEditedReviewSuccess());
        } else {
          new Error('Something went wrong');
          dispatch(setAlert('Edit Review', `Something went wrong`, 'DANGER'));
        }
      })
      .then(() => {
        dispatch(clearForm());
        dispatch(fetchOneCampground(campgroundId));
        dispatch(
          setAlert('Edit Review', `Review successfully edited`, 'SUCCESS')
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(submitEditedReviewFail(error.response.data.message));
          dispatch(
            setAlert('Edit Review', `${error.response.data.message}`, 'DANGER')
          );
        } else {
          dispatch(submitEditedReviewFail(error.message));
          dispatch(setAlert('Edit Review', `Something went wrong`, 'DANGER'));
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
          fetchFormData(
            {
              review: res.data.data.review,
              rating: res.data.data.rating,
            },
            'review',
            'review'
          )
        );
        dispatch(fetchOneReviewSuccess(res.data.data));
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
      dispatch(deleteReviewSuccess());
      dispatch(
        setAlert('Delete Review', `Review successfully deleted`, 'SUCCESS')
      );
    })
    .then(() => {
      dispatch(fetchOneCampground(campgroundId));
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(deleteReviewFail(error.response.data.message));
        dispatch(
          setAlert('Delete Review', `${error.response.data.message}`, 'DANGER')
        );
      } else {
        console.error(error.message);
        dispatch(deleteReviewFail(error.message));
        dispatch(setAlert('Delete Review', `Something went wrong`, 'DANGER'));
      }
    });
};
