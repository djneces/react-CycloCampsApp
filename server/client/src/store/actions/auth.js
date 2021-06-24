import axios from 'axios';
import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from './actionTypes';

import { fetchUser } from './user';
import { clearForm } from './form';

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

// Sign in the user with username and password
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
      dispatch(clearForm());
    })
    .catch((error) => {
      console.log(error.response.data.message);
      //dispatch message on error response obj
      dispatch(authFail(error.response.data.message));
    });
};

// Register user
export const registerUser =
  (username, email, password, confirmPassword) => async (dispatch) => {
    dispatch(authStart());

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const user = new Promise((resolve, reject) => {
      axios
        .post(
          '/api/auth/register',
          { username, email, password, confirmPassword },
          options
        )
        .then((res) => {
          if (res.status === 201) {
            resolve(res);
            //wait until it's successfully fetched
            return dispatch(fetchUser());
          } else {
            console.error('Something went wrong');
          }
        })
        .then(() => {
          dispatch(authSuccess());
          dispatch(clearForm());
        })
        .catch((error) => {
          if (error.response.data.errors) {
            dispatch(authFail(error.response.data.errors[0]));
          }
        });
    });

    return await user;
  };

// Sign out the user
export const signOutUser = () => {
  axios
    .get('/api/auth/logout')
    .then((res) => {
      if (res.status === 200) {
        //TODO alert
        console.log(res.data.msg);
      }
    })
    .catch((err) => console.error('Something went wrong', err));
  return {
    type: AUTH_LOGOUT,
  };
};
