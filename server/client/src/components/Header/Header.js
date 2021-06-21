import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import * as formActions from '../../store/actions/form';
import Input from '../../components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../util/validators';
import Button from '../FormElements/Button';
import './Header.scss';

const Header = ({
  usernameSignIn,
  registerUser,
  isAuthenticated,
  currentUser,
  validateForm,
  clearForm,
  formIsValid,
  loginForm,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toggleRegister) {
      usernameSignIn(loginForm.username.value, loginForm.password.value);
    }
    if (toggleRegister) {
      // registerUser(loginForm.username.value, loginForm.password.value);
    }

    clearForm('login');
    setToggleMenu(false);
  };

  // useCallback to avoid infinite loop
  const InputHandler = useCallback((id, formIsValid) => {
    validateForm(id, formIsValid, 'login');
  }, []);

  const renderLoginForm = () => {
    return (
      <div className='Header__loginMenu'>
        {!toggleMenu ? (
          <>
            <div
              className='Header__loginMenu-login'
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              Login <i className='fas fa-lock'></i>
            </div>
            <div
              className='Header__loginMenu-register'
              onClick={() => {
                // setToggleMenu(!toggleMenu);
                setToggleRegister(!toggleRegister);
              }}
            >
              Register <i className='fas fa-user-plus'></i>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              element='input'
              type='text'
              placeholder='username...'
              errorText='Please enter username (3 - 15 characters)'
              validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(15)]}
              onInput={InputHandler}
              id='username'
              formName='login'
            />
            <Input
              element='input'
              type='text'
              placeholder='password...'
              errorText='Please enter password (8 - 15 characters)'
              validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(15)]}
              onInput={InputHandler}
              id='password'
              formName='login'
            />
            <Button disabled={!formIsValid}>Login</Button>
          </form>
        )}
      </div>
    );
  };

  return (
    <div className='Header'>
      <div className='Header__logo'>
        <Link to='/'>
          <i
            className='fas fa-biking'
            onClick={() => {
              setToggleMenu(false);
              setToggleRegister(false);
            }}
          ></i>
        </Link>
        EV6 <span>CycloCamps</span> Network
      </div>
      {isAuthenticated ? (
        <div className='Header__accountMenu'>
          <div className='Header__accountMenu-username'>
            Hi <span>{currentUser}</span>
          </div>
          <div className='Header__accountMenu-burgerMenu'>
            <i className='fas fa-ellipsis-h'></i>
          </div>
        </div>
      ) : (
        renderLoginForm()
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, form }) => ({
  isAuthenticated: auth.isAuthenticated,
  currentUser: auth.currentUser?.user?.username,
  formIsValid: form.login.isValid,
  loginForm: form.login,
});

export default connect(mapStateToProps, { ...authActions, ...formActions })(
  Header
);
