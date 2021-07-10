import React from 'react';
import { connect } from 'react-redux';

import Input from '../FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  CONFIRM_PASSWORD,
} from '../../util/validators';
import Button from '../FormElements/Button';
import SpinnerLoader from '../UIElements/SpinnerLoader';

import './RegisterForm.scss';

const RegisterForm = ({
  handleSubmit,
  inputHandler,
  regFormIsValid,
  passwordValue,
  userIsLoading,
}) => {
  return (
    <div className='RegisterForm'>
      <div className='RegisterForm__heading'>
        <h3>Register form</h3>
      </div>

      <form onSubmit={handleSubmit} className='RegisterForm__inputs'>
        <Input
          element='input'
          type='text'
          placeholder='username...'
          errorText='Please enter username (3 - 15 characters)'
          validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(15)]}
          onInput={inputHandler}
          id='username'
          formName='register'
        />
        <Input
          element='input'
          type='text'
          placeholder='email...'
          errorText='Please enter valid email'
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          id='email'
          formName='register'
        />
        <Input
          element='input'
          type='password'
          placeholder='password...'
          errorText='Please enter password (8 - 15 characters)'
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(15)]}
          onInput={inputHandler}
          id='password'
          formName='register'
        />
        <Input
          element='input'
          type='password'
          placeholder='confirm password...'
          errorText='Password must match'
          validators={[CONFIRM_PASSWORD(passwordValue)]}
          onInput={inputHandler}
          id='confirmPassword'
          formName='register'
        />
        <div className='RegisterForm__inputs-controls'>
          <Button disabled={!regFormIsValid} size={'block'}>
            Register
          </Button>
          {userIsLoading && <SpinnerLoader />}
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = ({ form, auth }) => ({
  passwordValue: form.register.password,
  userIsLoading: auth.isLoading,
});

export default connect(mapStateToProps)(RegisterForm);
