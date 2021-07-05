import {
  CHANGE_INPUT,
  TOUCH_INPUT,
  VALIDATE_FORM,
  CLEAR_FORM,
  ADD_STAR_RATING,
  FETCH_FORM_DATA,
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
    confirmPassword: {
      value: '',
      isValid: false,
    },
    isValid: false,
  },
  review: {
    review: {
      value: '',
      isValid: false,
      stars: 4,
    },
    isValid: false,
  },
  account: {
    username: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false,
    },
    isValid: false,
  },
  campground: {
    description: {
      value: '',
      isValid: false,
    },
    price: {
      value: '',
      isValid: false,
    },
    title: {
      value: '',
      isValid: false,
    },
    location: {
      value: '',
      isValid: false,
    },
    isValid: false,
  },
};

const formReducer =
  // (name, INITIAL_STATE) =>
  (state = INITIAL_STATE, action) => {
    const { type, payload, validators, key, formName } = action;

    switch (type) {
      case CHANGE_INPUT:
        return {
          ...state,
          [key]: {
            ...state[key],
            [payload.id]: {
              ...state[key][payload.id],
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
      case ADD_STAR_RATING:
        return {
          ...state,
          review: {
            ...state.review,
            review: { ...state.review.review, stars: payload },
          },
        };
      case FETCH_FORM_DATA:
        let formFetchData;
        if (formName === 'review') {
          formFetchData = {
            ...state,
            [formName]: {
              ...state[formName],
              [key]: {
                ...state[formName][key],
                value: payload.review,
                stars: payload.rating,
                ...payload,
              },
            },
          };
        }
        if (formName === 'account') {
          formFetchData = {
            ...state,
            [formName]: {
              ...state[formName],
              username: {
                ...state[formName].username,
                value: payload.username,
              },
              email: { ...state[formName].email, value: payload.email },
            },
          };
        }
        if (formName === 'campground') {
          formFetchData = {
            ...state,
            [formName]: {
              ...state[formName],
              description: {
                ...state[formName].description,
                value: payload.description,
              },
              price: { ...state[formName].price, value: payload.price },
              title: { ...state[formName].title, value: payload.title },
              location: {
                ...state[formName].location,
                value: payload.location,
              },
            },
          };
        }
        return formFetchData;
      case CLEAR_FORM:
        return INITIAL_STATE;
      default:
        return state;
    }
  };

export default formReducer;
