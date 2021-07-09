import axios from 'axios';
import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from './actionTypes';

import { fetchUser } from './user';
import { clearForm } from './form';
import { setAlert } from './alert';
import { sendWelcomeEmail } from './email';

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
export const usernameSignIn =
  (username, password, history) => async (dispatch) => {
    dispatch(authStart());
    const options = {
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
          dispatch(setAlert('Login', `Something went wrong`, 'DANGER'));
        }
      })
      .then(() => {
        dispatch(authSuccess());
        dispatch(clearForm());
        // history.push(loc);
        dispatch(setAlert('Login', `You are logged in`, 'SUCCESS'));
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        //dispatch message on error response obj
        dispatch(authFail(error.response.data.message));
        dispatch(setAlert('Login', `${error.response.data.message}`, 'DANGER'));
      });
  };

// Register user
export const registerUser =
  (username, email, password, confirmPassword, history) => async (dispatch) => {
    dispatch(authStart());

    const options = {
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
            dispatch(setAlert('Register', `Something went wrong`, 'DANGER'));
          }
        })
        .then(() => {
          dispatch(authSuccess());
          dispatch(clearForm());
          history.push('/');
          dispatch(setAlert('Register', `You have been registered`, 'SUCCESS'));
          dispatch(sendWelcomeEmail(email));
        })
        .catch((error) => {
          if (error.response.data.message) {
            dispatch(authFail(error.response.data.message));
            dispatch(
              setAlert('Register', `${error.response.data.message}`, 'DANGER')
            );
          } else {
            dispatch(authFail(error.message));
            dispatch(setAlert('Register', `${error.message}`, 'DANGER'));
          }
        });
    });

    return await user;
  };

// Sign out the user
export const signOutUser = () => (dispatch) => {
  axios
    .get('/api/auth/logout')
    .then((res) => {
      if (res.status === 200) {
        dispatch(setAlert('Logout', `${res.data.msg}`, 'SUCCESS'));
        clearForm();
      }
    })
    .catch((err) => {
      console.error('Something went wrong', err);
      dispatch(setAlert('Logout', `Something went wrong`, 'DANGER'));
    });
  dispatch({ type: AUTH_LOGOUT });
};
