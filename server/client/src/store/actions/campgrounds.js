import axios from 'axios';
import {
  FETCH_ALL_CAMPGROUNDS,
  FETCH_ONE_CAMPGROUND,
  FETCH_CAMPGROUNDS_START,
  FETCH_CAMPGROUNDS_SUCCESS,
  FETCH_CAMPGROUNDS_FAIL,
} from './actionTypes';

// Start campground fetching
export const fetchCampgroundStart = () => ({
  type: FETCH_CAMPGROUNDS_START,
});

// Campground fetching success
export const fetchCampgroundSuccess = () => {
  return {
    type: FETCH_CAMPGROUNDS_SUCCESS,
  };
};

// Campground fetching fail
export const fetchCampgroundFail = (error) => ({
  type: FETCH_CAMPGROUNDS_FAIL,
  payload: error,
});

// Fetch all campgrounds (filtering by limit and page)
export const fetchAllCampgrounds = (limit, page) => async (dispatch) => {
  dispatch(fetchCampgroundStart());
  axios
    .get(`/api/campgrounds?limit=${limit}&page=${page}`)
    .then((res) => {
      if (res.status === 200) {
        //wait until it's successfully fetched
        return dispatch({
          type: FETCH_ALL_CAMPGROUNDS,
          payload: { campgrounds: res.data.data, allDocs: res.data.allDocs },
        });
      } else {
        new Error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(fetchCampgroundSuccess());
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        //dispatch message on error response obj
        dispatch(fetchCampgroundFail(error.response.data.message));
      } else {
        dispatch(fetchCampgroundFail(error.message));
      }
    });
};

// Fetch one campground
export const fetchOneCampground = (campgroundId) => async (dispatch) => {
  dispatch(fetchCampgroundStart());
  axios
    .get(`/api/campgrounds/${campgroundId}`)
    .then((res) => {
      if (res.status === 200) {
        //wait until it's successfully fetched
        return dispatch({
          type: FETCH_ONE_CAMPGROUND,
          payload: res.data.data,
        });
      } else {
        new Error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(fetchCampgroundSuccess());
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch message on error response obj
        dispatch(fetchCampgroundFail(error.response.data.message));
      } else {
        dispatch(fetchCampgroundFail(error.message));
      }
    });
};
