/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import * as formActions from '../../store/actions/form';

import SideDrawer from './SideDrawer';
import AccountDetailsSide from './AccountDetailsSide';
import Backdrop from '../UIElements/Backdrop';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SpinnerLoader from '../UIElements/SpinnerLoader';

import './NavigationMenu.scss';

const NavigationMenu = ({
  usernameSignIn,
  registerUser,
  isAuthenticated,
  currentUser,
  validateForm,
  loginFormIsValid,
  regFormIsValid,
  loginForm,
  registerForm,
  userIsLoading,
}) => {
  const [toggleLoginMenu, setToggleLoginMenu] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleAccountDetails, setToggleAccountDetails] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const history = useHistory();

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
    setToggleLoginMenu(false);
    setToggleRegister(false);
    setToggleAccountDetails(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toggleRegister) {
      usernameSignIn(
        loginForm.username.value,
        loginForm.password.value,
        history
      );
    }
    if (toggleRegister) {
      // Await until user is fetched, then toggle the register form
      await registerUser(
        registerForm.username.value,
        registerForm.email.value,
        registerForm.password.value,
        registerForm.confirmPassword.value,
        history
      );
      if (!userIsLoading) setToggleRegister(false);
    }
  };

  // useCallback to avoid infinite loop
  const inputLoginHandler = useCallback((id, loginFormIsValid) => {
    validateForm(id, loginFormIsValid, 'login');
  }, []);

  const inputRegisterHandler = useCallback((id, loginFormIsValid) => {
    validateForm(id, loginFormIsValid, 'register');
  }, []);

  return (
    <div className='NavigationMenu'>
      {drawerIsOpen && toggleAccountDetails && (
        <Backdrop onClick={closeDrawerHandler} />
      )}

      <SideDrawer
        show={toggleAccountDetails && drawerIsOpen}
        onClick={closeDrawerHandler}
      >
        <AccountDetailsSide />
      </SideDrawer>

      {drawerIsOpen && toggleRegister && (
        <Backdrop onClick={closeDrawerHandler} />
      )}
      <SideDrawer show={toggleRegister && drawerIsOpen}>
        <RegisterForm
          regFormIsValid={regFormIsValid}
          handleSubmit={handleSubmit}
          inputHandler={inputRegisterHandler}
        />
      </SideDrawer>

      <div className='NavigationMenu__logo'>
        <Link to='/'>
          <i
            className='fas fa-biking'
            onClick={() => {
              setToggleLoginMenu(false);
              setToggleRegister(false);
            }}
          ></i>
          <span>USA </span>
          <span>CycloCamps</span>
          <span> Network</span>
        </Link>
      </div>
      {/* false true */}
      {toggleLoginMenu && window.innerWidth < 1100 ? null : (
        <nav className='NavigationMenu__links'>
          <ul>
            <li>
              <Link to='/campgrounds'>
                <i className='fas fa-chevron-right'></i>All Campgrounds
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {isAuthenticated ? (
        <div className='NavigationMenu__accountMenu'>
          <div className='NavigationMenu__accountMenu-username'>
            Hi, <span>{currentUser}</span>
          </div>
          <div className='NavigationMenu__accountMenu-burgerMenu'>
            {!userIsLoading ? (
              <i
                className='fas fa-ellipsis-h'
                onClick={() => {
                  toggleDrawerHandler();
                  setToggleAccountDetails(true);
                }}
              ></i>
            ) : (
              <SpinnerLoader />
            )}
          </div>
        </div>
      ) : (
        <LoginForm
          toggleLoginMenu={toggleLoginMenu}
          toggleRegister={toggleRegister}
          formIsValid={loginFormIsValid}
          handleSubmit={handleSubmit}
          inputHandler={inputLoginHandler}
          setToggleLoginMenu={setToggleLoginMenu}
          setToggleRegister={setToggleRegister}
          toggleDrawerHandler={toggleDrawerHandler}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, form }) => ({
  isAuthenticated: auth.isAuthenticated,
  currentUser: auth.currentUser?.user?.username,
  userIsLoading: auth.isLoading,
  loginFormIsValid: form.login.isValid,
  regFormIsValid: form.register.isValid,
  loginForm: form.login,
  registerForm: form.register,
});

export default connect(mapStateToProps, { ...authActions, ...formActions })(
  NavigationMenu
);
