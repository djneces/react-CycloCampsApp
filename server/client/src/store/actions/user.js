import axios from 'axios';
import {
  FETCH_USER,
  AUTH_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from './actionTypes';
import { clearForm } from './form';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/current_user');
    if (res.status === 200) {
      dispatch({ type: FETCH_USER, payload: res.data });
      //returns => auth.js can dispatch authSuccess
      return res;
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};

//******************************* *
// Start submitting edited user
export const submitEditedUserStart = () => ({
  type: UPDATE_USER_START,
});

// Submit edited user success
export const submitEditedUserSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
  };
};

// Submit edited user fail
export const submitEditedUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

// Edit user
export const updateCurrentUser = (username, email) => async (dispatch) => {
  dispatch(submitEditedUserStart());

  const options = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };
  axios
    .patch(`/api/users/current_user`, { username, email }, options)
    .then((res) => {
      if (res.status === 200) {
        return dispatch(submitEditedUserSuccess());
      } else {
        new Error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(clearForm());
      dispatch(fetchUser());
    })
    .catch((error) => {
      //TODO duplicate email alert
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(submitEditedUserFail(error.response.data.message));
      } else {
        dispatch(submitEditedUserFail(error.message));
      }
    });
};

//******************************* */
// Start deleting user
export const deleteUserStart = () => ({
  type: DELETE_USER_START,
});

// Delete user success
export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

// Delete user fail
export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: error,
});

// Delete user
export const deleteUser = () => async (dispatch) => {
  dispatch(deleteUserStart());
  axios
    .delete(`api/users/current_user`)
    .then((res) => {
      //TODO alert
      dispatch(deleteUserSuccess());
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(deleteUserFail(error.response.data.message));
        //TODO alert
      } else {
        console.error(error.message);
        dispatch(deleteUserFail(error.message));
      }
    });
};
