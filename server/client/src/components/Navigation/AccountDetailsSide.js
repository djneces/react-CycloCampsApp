import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOutUser } from '../../store/actions/auth';

import './AccountDetailsSide.scss';

const AccountDetailsSide = ({ signOutUser }) => {
  return (
    <div className='AccountDetailsSide'>
      <div className='AccountDetailsSide__heading'>
        <h3>Your Account</h3>
      </div>
      <div className='AccountDetailsSide__navLinks'>
        <div className='AccountDetailsSide__navLinks--accountDetails'>
          <Link to='/your-account'>
            <span>Account Details</span>
            <span>- your campgrounds</span>
          </Link>
        </div>
        <div className='AccountDetailsSide__navLinks--logout'>
          <Link to='/logout' onClick={signOutUser}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { signOutUser })(AccountDetailsSide);
