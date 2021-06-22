import {
  CHANGE_INPUT,
  TOUCH_INPUT,
  VALIDATE_FORM,
  CLEAR_FORM,
} from './actionTypes';

export const changeInput = (e, validators, key) => {
  return {
    type: CHANGE_INPUT,
    payload: { id: e.target.id, value: e.target.value },
    validators: validators,
    key: key,
  };
};

export const touchInput = (inputId, key) => {
  return {
    type: TOUCH_INPUT,
    payload: inputId,
    key: key,
  };
};

export const validateForm = (inputId, isValid, key) => {
  return {
    type: VALIDATE_FORM,
    payload: { inputId, isValid },
    key: key,
  };
};

export const clearForm = () => {
  return {
    type: CLEAR_FORM,
  };
};