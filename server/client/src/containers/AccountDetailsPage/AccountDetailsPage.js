import React from 'react';

import AccountDetails from '../../components/AccountDetails/AccountDetails';
import CreatedCampgroundsList from '../../components/CreatedCampgroundsList/CreatedCampgroundsList';

import './AccountDetailsPage.scss';

const AccountDetailsPage = () => {
  return (
    <div className='AccountDetailsPage'>
      <AccountDetails />
      <CreatedCampgroundsList />
    </div>
  );
};

export default AccountDetailsPage;
