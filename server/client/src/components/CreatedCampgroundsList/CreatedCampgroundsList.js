import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as campgroundActions from '../../store/actions/campgrounds';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import CreatedCampground from './CreatedCampground';

import './CreatedCampgroundsList.scss';

const CreatedCampgroundsList = ({
  fetchAllCampgrounds,
  deleteCampground,
  currentUser,
  usersCampgrounds,
  usersCampgroundsResults,
  campgroundIsLoading,
}) => {
  useEffect(() => {
    if (currentUser) {
      fetchAllCampgrounds(null, null, currentUser._id);
    }
  }, [currentUser, fetchAllCampgrounds]);

  const handleDeleteCampground = (campgroundId, images) => {
    deleteCampground(campgroundId, currentUser._id, images);
  };

  const renderCampgroundsList = () => {
    if (usersCampgroundsResults > 0) {
      const { campgrounds } = usersCampgrounds;
      return campgrounds.map((campground) => {
        const { title, location, images, _id } = campground;

        return (
          <CreatedCampground
            key={_id}
            title={title}
            location={location}
            images={images}
            campgroundId={_id}
            handleDeleteCampground={handleDeleteCampground}
          />
        );
      });
    }
    if (usersCampgroundsResults === 0) {
      return (
        <div className='CreatedCampgroundsList__resultsNumber--noResults'>
          <h3>Your campgrounds</h3>
          <span>No campgrounds found</span>
          <Link to='/new-campground' className={'linkButton'}>
            Create your first one
          </Link>
        </div>
      );
    }
  };

  return (
    <div className='CreatedCampgroundsList'>
      {usersCampgroundsResults && usersCampgroundsResults > 0 ? (
        <div className='CreatedCampgroundsList__resultsNumber'>
          <h3>
            Your campgrounds <span>{usersCampgroundsResults}</span>
          </h3>
        </div>
      ) : null}
      {campgroundIsLoading && <SpinnerLoader />}
      {renderCampgroundsList()}
    </div>
  );
};

const mapStateToProps = ({ auth, campgrounds }) => ({
  currentUser: auth.currentUser?.user,
  usersCampgrounds: campgrounds.usersCampgrounds,
  usersCampgroundsResults: campgrounds.usersCampgrounds.results,
  campgroundIsLoading: campgrounds.isLoading,
});

export default connect(
  mapStateToProps,
  campgroundActions
)(CreatedCampgroundsList);
