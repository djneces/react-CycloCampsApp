import React from 'react';
import { connect } from 'react-redux';

import CampgroundReviewForm from '../CampgroundDetail/CampgroundReviewForm';
import * as reviewActions from '../../store/actions/review';

import './CampgroundUpdateForm.scss';

const CampgroundUpdateForm = ({
  reviewId,
  campgroundId,
  prevReview,
  prevRating,
  newReview,
  newRating,
  updateReview,
  handleToggleModal,
}) => {
  const handleReviewSubmit = () => {
    let review, rating;
    review = prevReview === newReview ? prevReview : newReview;
    rating = prevRating === newRating ? prevRating : newRating;
    updateReview(campgroundId, reviewId, review, rating);
    handleToggleModal();
  };

  return (
    <div className='CampgroundUpdateForm'>
      <CampgroundReviewForm
        rating={prevRating}
        handleReviewSubmit={handleReviewSubmit}
        fetchFormData
      />
    </div>
  );
};
const mapStateToProps = ({ form }) => ({
  newReview: form.review.review.value,
  newRating: form.review.review.stars,
});

export default connect(mapStateToProps, reviewActions)(CampgroundUpdateForm);
