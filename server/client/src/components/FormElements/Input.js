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
}) => {
  // State when editing form to correctly show !disabled button
  const [reviewFormTouched, setReviewFormTouched] = useState(false);

  // Input change
  const changeHandler = (e) => {
    changeInput(e, validators, formName);
  };

  // Input has been touched
  const touchHandler = (e) => {
    touchInput(e.target.id, formName);
  };

  useEffect(() => {
    // hack to force validation and possibility to change star rating only (no changes in review) when editing a review
    if (element === 'textarea' && formName === 'review') {
      if (form[formName][id].value.length === 0) return;
      if (!reviewFormTouched) {
        changeInput(
          { target: { id: id, value: form[formName][id].value } },
          validators,
          formName
        );
        if (form[formName][id].value.length > 0) {
          setReviewFormTouched(true);
        }
      }
    }
  }, [form[formName][id].value]);

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
