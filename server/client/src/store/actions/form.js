import {
  CHANGE_INPUT,
  TOUCH_INPUT,
  VALIDATE_FORM,
  CLEAR_FORM,
  ADD_STAR_RATING,
  FETCH_FORM_DATA,
} from './actionTypes';

export const changeInput = (e, validators, formName) => {
  return {
    type: CHANGE_INPUT,
    payload: { id: e.target.id, value: e.target.value },
    validators: validators,
    formName: formName,
  };
};

export const touchInput = (inputId, formName) => {
  return {
    type: TOUCH_INPUT,
    payload: inputId,
    formName: formName,
  };
};

export const validateForm = (inputId, isValid, formName) => {
  return {
    type: VALIDATE_FORM,
    payload: { inputId, isValid },
    formName: formName,
  };
};

export const clearForm = () => {
  return {
    type: CLEAR_FORM,
  };
};

export const addStarRating = (numberOfStars) => {
  return {
    type: ADD_STAR_RATING,
    payload: numberOfStars,
  };
};

export const fetchFormData = (data, formName, key) => {
  return {
    type: FETCH_FORM_DATA,
    payload: data,
    formName: formName,
    key: key,
  };
};
