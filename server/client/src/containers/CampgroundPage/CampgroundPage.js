import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import CampgroundDetail from '../../components/CampgroundDetail/CampgroundDetail';
import * as campgroundActions from '../../store/actions/campgrounds';
import './CampgroundPage.scss';

const CampgroundPage = ({ fetchOneCampground }) => {
  const { campgroundId } = useParams();

  useEffect(() => {
    fetchOneCampground(campgroundId);
  }, [fetchOneCampground, campgroundId]);

  return (
    <div className='CampgroundPage'>
      <CampgroundDetail campgroundId={campgroundId} />
    </div>
  );
};

export default connect(null, campgroundActions)(CampgroundPage);
