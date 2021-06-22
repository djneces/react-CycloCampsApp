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
        <div>
          <Link to='/'>Account Details</Link>
          <Link to='/'>Your Campsites</Link>
        </div>
        <div>
          <Link to='/' onClick={signOutUser}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { signOutUser })(AccountDetailsSide);
