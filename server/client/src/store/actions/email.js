import axios from 'axios';
import { SEND_WELCOME_EMAIL } from './actionTypes';

export const sendWelcomeEmail = (email) => (dispatch) => {
  const options = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  axios
    .post(`/api/campgrounds/send-email`, { email }, options)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: SEND_WELCOME_EMAIL, payload: res.data });
      } else {
        new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error.response.data.message);
      new Error('Something went wrong');
    });
};
