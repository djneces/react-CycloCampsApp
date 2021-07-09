import { SEND_WELCOME_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = { emailSent: null };
const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_WELCOME_EMAIL:
      return { ...state, emailSent: payload };
    default:
      return state;
  }
};

export default alertReducer;
