import axios from 'axios';
import {
  FETCH_ALL_CAMPGROUNDS,
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

//
export const fetchAllCampgrounds = () => async (dispatch) => {
  dispatch(fetchCampgroundStart());
  axios
    .get('/api/campgrounds')
    .then((res) => {
      if (res.status === 200) {
        //wait until it's successfully fetched
        return dispatch({
          type: FETCH_ALL_CAMPGROUNDS,
          payload: res.data.data,
        });
      } else {
        console.error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(fetchCampgroundSuccess());
    })
    .catch((error) => {
      console.log(error.response.data.message);
      //dispatch message on error response obj
      dispatch(fetchCampgroundFail(error.response.data.message));
    });
};
