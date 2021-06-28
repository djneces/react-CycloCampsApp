import React from 'react';

import CampgroundsList from '../../components/CampgroundsList/CampgroundsList';
import Map from '../../components/Map/Map';

import './CampgroundsPage.scss';

const CampgroundsPage = () => {
  return (
    <div className='CampgroundsPage'>
      <CampgroundsList />
      <Map />
    </div>
  );
};
export default CampgroundsPage;
