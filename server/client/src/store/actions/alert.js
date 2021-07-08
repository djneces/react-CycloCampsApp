import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

export const setAlert =
  (title, message, type, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { title, message, type, id },
    });
    setTimeout(
      () => dispatch({ type: DELETE_NOTIFICATION, payload: id }),
      timeout
    );
  };

export const removeAlert = (id) => {
  return { type: DELETE_NOTIFICATION, payload: id };
};
