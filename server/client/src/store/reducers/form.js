import { combineReducers } from 'redux';
import {
  CHANGE_INPUT,
  TOUCH_INPUT,
  VALIDATE_FORM,
  CLEAR_FORM,
} from '../actions/actionTypes';
import { validate } from '../../util/validators';

const INITIAL_STATE = {
  login: {
    username: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
    isValid: false,
  },
  register: {
    username: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
    isValid: false,
  },
};

const formReducer =
  // (name, INITIAL_STATE) =>
  (state = INITIAL_STATE, action) => {
    const { type, payload, validators, key } = action;

    switch (type) {
      case CHANGE_INPUT:
        return {
          ...state,
          [key]: {
            ...state[key],
            [payload.id]: {
              value: payload.value,
              isValid: validate(payload.value, validators),
            },
          },
        };
      case TOUCH_INPUT:
        return {
          ...state,
          [key]: {
            ...state[key],
            [payload]: { ...state[key][payload], isTouched: true },
          },
        };
      case VALIDATE_FORM:
        let formIsValid = true;
        for (const inputId in state[key]) {
          //remove isValid attribute from the for in loop
          if (inputId === 'isValid') continue;
          if (inputId === payload.inputId) {
            formIsValid = formIsValid && payload.isValid;
          } else {
            formIsValid = formIsValid && state[key][inputId].isValid;
          }
        }

        return {
          ...state,
          [key]: {
            ...state[key],
            isValid: formIsValid,
          },
        };
      case CLEAR_FORM:
        return INITIAL_STATE;
      default:
        return state;
    }
  };

export default formReducer;
