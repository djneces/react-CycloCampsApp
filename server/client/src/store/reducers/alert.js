import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../actions/actionTypes';

const INITIAL_STATE = [];
const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NOTIFICATION:
      return [...state, payload];
    case DELETE_NOTIFICATION:
      return state.filter((notification) => notification.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
