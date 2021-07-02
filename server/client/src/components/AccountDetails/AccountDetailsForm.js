import React from 'react';
import { connect } from 'react-redux';

import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import * as formActions from '../../store/actions/form';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from '../../util/validators';

import './AccountDetailsForm.scss';

const AccountDetailsForm = ({
  handleAccountUpdateSubmit,
  handleToggleModal,
  inputReviewHandler,
  accountDetailsFormIsValid,
  username,
  email,
}) => {
  return (
    <div className='AccountDetailsForm'>
      <>
        <Input
          element='input'
          type='text'
          placeholder='username...'
          errorText='Username should have 3 - 15 characters'
          validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(15)]}
          onInput={inputReviewHandler}
          id='username'
          formName='account'
        />
        <Input
          element='input'
          type='text'
          placeholder='email...'
          errorText='Please enter valid email'
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputReviewHandler}
          id='email'
          formName='account'
        />
        <div>
          <Button
            inverse
            onClick={() => {
              handleAccountUpdateSubmit(username, email);
              handleToggleModal();
            }}
            disabled={!accountDetailsFormIsValid}
          >
            Submit changes
          </Button>
        </div>
      </>
    </div>
  );
};

const mapStateToProps = ({ form }) => ({
  accountDetailsFormIsValid: form.account.isValid,
  username: form.account.username.value,
  email: form.account.email.value,
});

export default connect(mapStateToProps, formActions)(AccountDetailsForm);
