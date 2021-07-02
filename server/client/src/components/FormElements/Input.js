import React, { useEffect, useState } from 'react';

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
  label,
}) => {
  // State when editing form to correctly show !disabled button
  const [formTouched, setFormTouched] = useState(false);

  // Input change
  const changeHandler = (e) => {
    changeInput(e, validators, formName);
  };

  // Input has been touched
  const touchHandler = (e) => {
    touchInput(e.target.id, formName);
  };

  const formValue = form[formName][id].value;
  useEffect(() => {
    // hack to force the validation => button disable state corresponds to the fetched input
    // use this when preloading forms with default data from redux (when editing)
    if (
      formName === 'review' ||
      formName === 'account' ||
      formName === 'campground'
    ) {
      if (formValue.length === 0) return;
      if (!formTouched) {
        changeInput(
          { target: { id: id, value: formValue } },
          validators,
          formName
        );
        if (formValue.length > 0) {
          setFormTouched(true);
        }
      }
    }
  }, [formValue, changeInput, formName, formTouched, id, validators]);

  // Whenever isValid changes
  const formIsValid = form[formName][id].isValid;
  useEffect(() => {
    onInput(id, formIsValid);
  }, [formIsValid, id, onInput]);

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
        placeholder={placeholder}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        // value fetched from redux
        value={form[formName][id].value}
      ></textarea>
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
      <div className='Input__label'>
        {label && <label htmlFor={id}>{label}</label>}
      </div>
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
