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
import { setAlert } from './alert';

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
        dispatch(setAlert('Update User', `Something went wrong`, 'DANGER'));
      }
    })
    .then(() => {
      dispatch(clearForm());
      dispatch(fetchUser());
      dispatch(
        setAlert('Update User', `Your details successfully updated`, 'SUCCESS')
      );
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(submitEditedUserFail(error.response.data.message));
        dispatch(
          setAlert('Update User', `${error.response.data.message}`, 'DANGER')
        );
      } else {
        dispatch(submitEditedUserFail(error.message));
        dispatch(setAlert('Update User', `Something went wrong`, 'DANGER'));
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
      dispatch(deleteUserSuccess());
      dispatch(setAlert('Delete User', `User successfully deleted`, 'SUCCESS'));
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(deleteUserFail(error.response.data.message));
        dispatch(
          setAlert('Delete User', `${error.response.data.message}`, 'DANGER')
        );
      } else {
        console.error(error.message);
        dispatch(deleteUserFail(error.message));
        dispatch(setAlert('Delete User', `Something went wrong`, 'DANGER'));
      }
    });
};
