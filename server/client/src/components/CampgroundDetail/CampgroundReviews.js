import React from 'react';
import useState from 'react-usestateref';
import { connect } from 'react-redux';

import * as reviewActions from '../../store/actions/review';
import CampgroundSingleReview from './CampgroundSingleReview';
import CampgroundReviewForm from './CampgroundReviewForm';

import './CampgroundReviews.scss';

const CampgroundReviews = ({
  reviews,
  campgroundId,
  reviewForm,
  submitReview,
  currentUser,
  deleteReview,
}) => {
  // Use of react-usestateref to get the actual correct state
  const [formDisabled, setFormDisabled, refFormDisabled] = useState(false);

  const handleReviewSubmit = () => {
    const { value, stars } = reviewForm;
    submitReview(campgroundId, value, stars);
  };

  const handleClick = (id) => {
    deleteReview(campgroundId, id);
  };

  const disableForm = () => {
    setFormDisabled((prevState) => !prevState);
  };

  const renderReviews = () => {
    if (reviews !== undefined && reviews.length > 0) {
      return reviews
        .map((singleReview) => {
          const { author, createdAt, rating, review, id } = singleReview;
          return (
            <CampgroundSingleReview
              key={id}
              author={author}
              rating={rating}
              review={review}
              createdAt={createdAt}
              currentUser={currentUser}
              reviewId={id}
              campgroundId={campgroundId}
              handleClick={handleClick}
              disableForm={disableForm}
            />
          );
        })
        .reverse();
    } else {
      return (
        <div className='CampgroundReviews__review'>
          No reviews yet, be the first one!
        </div>
      );
    }
  };

  return (
    <div className='CampgroundReviews'>
      <div className='CampgroundReviews__heading'>
        <h3>Campground Reviews</h3>
      </div>
      <div className='CampgroundReviews__review CampgroundReviews__review-input'>
        <CampgroundReviewForm
          handleReviewSubmit={handleReviewSubmit}
          // hiding the underlying form when editing a review
          hideFormUnder={refFormDisabled.current}
        />
      </div>
      {renderReviews()}
    </div>
  );
};

const mapStateToProps = ({ form, auth, campgrounds }) => ({
  reviewForm: form.review.review,
  currentUser: auth.currentUser?.user._id,
  reviews: campgrounds.selectedCampground?.reviews,
});

export default connect(mapStateToProps, reviewActions)(CampgroundReviews);
