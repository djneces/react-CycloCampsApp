import axios from 'axios';
import { clearForm, fetchFormData } from './form';
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
export const fetchAllCampgrounds =
  (limit, page, userId) => async (dispatch) => {
    dispatch(fetchCampgroundStart());
    axios
      .get(
        `${
          !userId
            ? `/api/campgrounds?limit=${limit}&page=${page}&sort=title`
            : `api/campgrounds?author=${userId}`
        }`
      )
      .then((res) => {
        if (res.status === 200) {
          if (userId) {
            return dispatch({
              type: FETCH_ALL_CAMPGROUNDS_BY_USER,
              payload: {
                campgrounds: res.data.data,
                results: res.data.results,
              },
            });
          }
          return dispatch({
            //wait until it's successfully fetched
            type: FETCH_ALL_CAMPGROUNDS,
            payload: {
              campgrounds: res.data.data,
              allDocs: res.data.allDocs,
            },
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

//******************************* *
// Start one campground fetching
export const fetchOneCampgroundStart = () => ({
  type: FETCH_ONE_CAMPGROUND_START,
});

// One campground fetching success
export const fetchOneCampgroundSuccess = (oneCampground) => {
  return {
    type: FETCH_ONE_CAMPGROUND_SUCCESS,
    payload: oneCampground,
  };
};

// One campground fetching fail
export const fetchOneCampgroundFail = (error) => ({
  type: FETCH_ONE_CAMPGROUND_FAIL,
  payload: error,
});

// Fetch one campground
export const fetchOneCampground = (campgroundId) => async (dispatch) => {
  dispatch(fetchOneCampgroundStart());
  axios
    .get(`/api/campgrounds/${campgroundId}`)
    .then((res) => {
      if (res.status === 200) {
        const response = res.data.data;
        //wait until it's successfully fetched
        dispatch(fetchOneCampgroundSuccess(response));
        dispatch(
          fetchFormData(
            {
              description: response.description,
              price: response.price,
              title: response.title,
              location: response.location,
            },
            'campground'
          )
        );
      } else {
        new Error('Something went wrong');
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.message);
        //dispatch message on error response obj
        dispatch(fetchOneCampgroundFail(error.response.data.message));
      } else {
        dispatch(fetchOneCampgroundFail(error.message));
      }
    });
};

//******************************* *
// Start submitting edited campground
export const submitEditedCampgroundStart = () => ({
  type: SUBMIT_EDITED_CAMPGROUND_START,
});

// Submit edited campground success
export const submitEditedCampgroundSuccess = () => {
  return {
    type: SUBMIT_EDITED_CAMPGROUND_SUCCESS,
  };
};

// Submit edited campground fail
export const submitEditedCampgroundFail = (error) => ({
  type: SUBMIT_EDITED_CAMPGROUND_FAIL,
  payload: error,
});

// Edit campground
export const updateCampground =
  (campgroundId, userId, location, title, description, price) =>
  async (dispatch) => {
    dispatch(submitEditedCampgroundStart());

    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    axios
      .patch(
        `/api/campgrounds/${campgroundId}`,
        { location, title, description, price },
        options
      )
      .then((res) => {
        if (res.status === 200) {
          return dispatch(submitEditedCampgroundSuccess());
        } else {
          new Error('Something went wrong');
        }
      })
      .then(() => {
        dispatch(clearForm());
        dispatch(fetchAllCampgrounds(null, null, userId));
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(submitEditedCampgroundFail(error.response.data.message));
        } else {
          dispatch(submitEditedCampgroundFail(error.message));
        }
      });
  };

//******************************* *
// Delete campground start
export const deleteCampgroundStart = () => ({
  type: DELETE_CAMPGROUND_START,
});

// Delete campground success
export const deleteCampgroundSuccess = () => {
  return {
    type: DELETE_CAMPGROUND_SUCCESS,
  };
};

// Delete campground fail
export const deleteCampgroundFail = (error) => ({
  type: DELETE_CAMPGROUND_FAIL,
  payload: error,
});

// Delete campground
export const deleteCampground = (campgroundId, userId) => async (dispatch) => {
  dispatch(deleteCampgroundStart());
  axios
    .delete(`/api/campgrounds/${campgroundId}`)
    .then((res) => {
      //TODO alert
      dispatch(deleteCampgroundSuccess());
    })
    .then(() => {
      dispatch(fetchAllCampgrounds(null, null, userId));
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(deleteCampgroundFail(error.response.data.message));
        //TODO alert
      } else {
        console.error(error.message);
        dispatch(deleteCampgroundFail(error.message));
      }
    });
};

// Fetch one campground coords
export const fetchOneCampgroundCoords = (coords) => ({
  type: FETCH_ONE_CAMPGROUND_COORDS,
  payload: coords,
});
