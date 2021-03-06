import React from 'react';
import { connect } from 'react-redux';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../util/validators';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import './LoginForm.scss';

const LoginForm = ({
  toggleLoginMenu,
  formIsValid,
  handleSubmit,
  inputHandler,
  setToggleLoginMenu,
  setToggleRegister,
  toggleDrawerHandler,
  userIsLoading,
}) => {
  return (
    <div className='LoginForm'>
      <div className='LoginForm__loginMenu'>
        {!toggleLoginMenu ? (
          <>
            <div
              className='LoginForm__loginMenu-login'
              onClick={() => {
                setToggleLoginMenu(true);
                setToggleRegister(false);
              }}
            >
              Login <i className='fas fa-lock'></i>
            </div>
            <div
              className='LoginForm__loginMenu-register'
              onClick={() => {
                setToggleLoginMenu(false);
                setToggleRegister(true);
                toggleDrawerHandler();
              }}
            >
              Register <i className='fas fa-user-plus'></i>
            </div>
          </>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className='LoginForm__loginMenu__inputs'
            >
              <Input
                element='input'
                type='text'
                placeholder='username...'
                errorText='Username should have 3 - 15 characters'
                validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(15)]}
                onInput={inputHandler}
                id='username'
                formName='login'
              />
              <Input
                element='input'
                type='password'
                placeholder='password...'
                errorText='Password should have 8 - 15 characters'
                validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(15)]}
                onInput={inputHandler}
                id='password'
                formName='login'
              />
              <Button disabled={!formIsValid}>Login</Button>
              <div className='LoginForm__loginMenu__inputs-controls'>
                {!userIsLoading && (
                  <i
                    className='fas fa-times'
                    onClick={() => {
                      setToggleLoginMenu(false);
                    }}
                  ></i>
                )}
                {userIsLoading && <SpinnerLoader />}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  userIsLoading: auth.isLoading,
});

export default connect(mapStateToProps)(LoginForm);
