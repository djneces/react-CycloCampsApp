import axios from 'axios';
import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_REGISTER,
  AUTH_LOGOUT,
} from './actionTypes';

import { fetchUser } from './user';

// Start authentication
export const authStart = () => ({
  type: AUTH_START,
});

// Authentication Success
export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS,
  };
};

// Authentication fail
export const authFail = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

export const usernameSignIn = (username, password) => async (dispatch) => {
  dispatch(authStart());

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };
  axios
    .post('/api/auth/login', { username, password }, options)
    .then((res) => {
      if (res.status === 200) {
        //wait until it's successfully fetched
        return dispatch(fetchUser());
      } else {
        console.error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(authSuccess());
    })
    .catch((error) => {
      console.log(error.response.data.message);
      //dispatch message on error response obj
      dispatch(authFail(error.response.data.message));
    });
};

export const registerUser = (username, password) => async (dispatch) => {
  dispatch(authStart());

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };
  axios
    .post('/api/auth/register', { username, password }, options)
    .then((res) => {
      if (res.status === 200) {
        //wait until it's successfully fetched
        return dispatch(fetchUser());
      } else {
        console.error('Something went wrong');
      }
    })
    .then(() => {
      dispatch(authSuccess());
    })
    .catch((error) => {
      console.log(error.response.data.message);
      //dispatch message on error response obj
      dispatch(authFail(error.response.data.message));
    });
};
