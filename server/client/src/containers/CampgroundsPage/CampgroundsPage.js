import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as campgroundActions from '../../store/actions/campgrounds';

import './CampgroundsPage.scss';

const CampgroundsPage = ({ fetchAllCampgrounds }) => {
  useEffect(() => {
    fetchAllCampgrounds();
  });
  return <div className='CampgroundsPage'>Camps</div>;
};

export default connect(null, campgroundActions)(CampgroundsPage);
