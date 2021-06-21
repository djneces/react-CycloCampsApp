import axios from 'axios';
import { FETCH_USER, AUTH_ERROR } from './actionTypes';

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
