import axios from 'axios';
import { clearForm, fetchFormData } from './form';
import { setAlert } from './alert';
import { uploadImages } from './image';
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
export const fetchOneCampground =
  (campgroundId, formDataFetch) => async (dispatch) => {
    dispatch(fetchOneCampgroundStart());
    axios
      .get(`/api/campgrounds/${campgroundId}`)
      .then((res) => {
        if (res.status === 200) {
          const response = res.data.data;
          //wait until it's successfully fetched
          dispatch(fetchOneCampgroundSuccess(response));

          if (formDataFetch === 'noFormDataFetch') {
            return;
          }
          // fetching form data together with one campground data only at /your-account
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
  (campgroundId, userId, location, title, description, price, formData) =>
  async (dispatch) => {
    dispatch(submitEditedCampgroundStart());

    // First upload pictures to Cloudinary, if any
    let imgUrl;
    if (formData) {
      imgUrl = await dispatch(uploadImages(formData));
    }

    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const data = { location, title, description, price, images: imgUrl };
    axios
      .patch(`/api/campgrounds/${campgroundId}`, data, options)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(submitEditedCampgroundSuccess());
        } else {
          new Error('Something went wrong');
        }
      })
      .then(() => {
        dispatch(clearForm());
        // limit, page, userId
        dispatch(fetchAllCampgrounds(null, null, userId));
        dispatch(setAlert('Edit Campground', `Edit successful`, 'SUCCESS'));
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(submitEditedCampgroundFail(error.response.data.message));
          dispatch(
            setAlert(
              'Edit Campground',
              `${error.response.data.message}`,
              'DANGER'
            )
          );
        } else {
          dispatch(submitEditedCampgroundFail(error.message));
          dispatch(
            setAlert('Edit Campground', `Something went wrong`, 'DANGER')
          );
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
export const deleteCampground =
  (campgroundId, userId, images) => async (dispatch) => {
    dispatch(deleteCampgroundStart());
    axios
      .delete(`/api/campgrounds/${campgroundId}`)
      .then((res) => {
        dispatch(deleteCampgroundSuccess());
      })
      .then(() => {
        // limit, page, userId
        dispatch(fetchAllCampgrounds(null, null, userId));
        dispatch(
          setAlert('Delete Campground', `Successfully deleted`, 'SUCCESS')
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(deleteCampgroundFail(error.response.data.message));
          dispatch(
            setAlert(
              'Delete Campground',
              `${error.response.data.message}`,
              'DANGER'
            )
          );
        } else {
          console.error(error.message);
          dispatch(deleteCampgroundFail(error.message));
          dispatch(
            setAlert('Delete Campground', `Something went wrong`, 'DANGER')
          );
        }
      });
  };

//******************************* *
// Fetch one campground coords
export const fetchOneCampgroundCoords = (coords) => ({
  type: FETCH_ONE_CAMPGROUND_COORDS,
  payload: coords,
});

//******************************* *
// Create campground start
export const createCampgroundStart = () => ({
  type: CREATE_NEW_CAMPGROUND_START,
});

// Create campground success
export const createCampgroundSuccess = () => {
  return {
    type: CREATE_NEW_CAMPGROUND_SUCCESS,
  };
};

// Create campground fail
export const createCampgroundFail = (error) => ({
  type: CREATE_NEW_CAMPGROUND_FAIL,
  payload: error,
});

// Create new campground
export const createCampground =
  (title, location, description, price, formData, history) =>
  async (dispatch) => {
    dispatch(createCampgroundStart());
    // First upload pictures to Cloudinary
    const imgUrl = await dispatch(uploadImages(formData));

    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    axios
      .post(
        `/api/campgrounds`,
        { title, location, description, price, images: imgUrl },
        options
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch(createCampgroundSuccess());
          // return campgroundId
          return res.data.data.id;
        } else {
          new Error('Something went wrong');
        }
      })
      .then((campgroundId) => {
        if (history) history.push(`/campgrounds/${campgroundId}`);
        dispatch(
          setAlert('Create Campground', `Successfully created`, 'SUCCESS')
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(createCampgroundFail(error.response.data.message));
          dispatch(
            setAlert(
              'Create Campground',
              `${error.response.data.message}`,
              'DANGER'
            )
          );
        } else {
          dispatch(createCampgroundFail(error.message));
          dispatch(
            setAlert('Create Campground', `Something went wrong`, 'DANGER')
          );
        }
      });
  };
