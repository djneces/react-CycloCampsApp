/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { changeInput, touchInput } from '../../store/actions/form';
import './Input.scss';

const Input = ({
  element,
  id,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  changeInput,
  touchInput,
  onInput,
  form,
  formName,
}) => {
  // Input change
  const changeHandler = (e) => {
    changeInput(e, validators, formName);
  };

  // Input has been touched
  const touchHandler = (e) => {
    touchInput(e.target.id, formName);
  };

  // Whenever isValid changes
  useEffect(() => {
    onInput(id, form[formName][id].isValid);
  }, [form[formName][id].isValid]);

  const renderedElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={form[formName][id].value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={form[formName][id].value}
      />
    );

  return (
    <div
      className={`Input ${
        !(form[formName][id] && form[formName][id].isValid) &&
        form[formName][id] &&
        form[formName][id].isTouched
          ? 'Input--invalid'
          : ''
      }`}
    >
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {renderedElement}
      {!(form[formName][id] && form[formName][id].isValid) &&
        form[formName][id] &&
        form[formName][id].isTouched && (
          <p className='Input--invalid-errorMessage'>{errorText}</p>
        )}
    </div>
  );
};
const mapStateToProps = ({ form }) => ({
  form,
});

export default connect(mapStateToProps, { changeInput, touchInput })(Input);
