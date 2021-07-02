import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Modal from '../UIElements/Modal';
import CampgroundUpdateReviewForm from '../CampgroundUpdateReviewForm/CampgroundUpdateReviewForm';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import * as reviewActions from '../../store/actions/review';
import * as formActions from '../../store/actions/form';

import './CampgroundSingleReview.scss';

const CampgroundSingleReview = ({
  author,
  rating,
  review,
  createdAt,
  currentUser,
  reviewId,
  campgroundId,
  handleDeleteReview,
  disableForm,
  fetchOneReview,
  clearForm,
  reviewIsEditing,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
    // Hiding the underlying form when modal is open
    disableForm();

    if (openModal) {
      clearForm();
    }
  };

  const handleEdit = () => {
    fetchOneReview(campgroundId, reviewId);
    handleToggleModal();
    setIsEdited(true);
  };

  useEffect(() => {
    if (!openModal) {
      setTimeout(() => {
        setIsEdited(false);
      }, 2000);
    }
  }, [openModal]);

  return (
    <>
      <Modal
        show={openModal}
        onCancel={handleToggleModal}
        header='Update your review'
      >
        <CampgroundUpdateReviewForm
          reviewId={reviewId}
          campgroundId={campgroundId}
          prevReview={review}
          prevRating={rating}
          handleToggleModal={handleToggleModal}
        />
      </Modal>
      <div className='CampgroundSingleReview'>
        <div className='CampgroundSingleReview-container'>
          <div>
            <div className='CampgroundSingleReview-author'>
              {author ? author.username : 'Anonymous author'}
            </div>
            <div className='CampgroundSingleReview-rating'>
              {Array.from({ length: rating }).map((star, i) => {
                return <i className='fas fa-star' key={`full-${i}`}></i>;
              })}
            </div>
          </div>
          <div>
            <div className='CampgroundSingleReview-createdAt'>
              {moment(createdAt).format('MMMM-Do-YY, h:mm A')}
            </div>
            <div className={`CampgroundSingleReview-controls`}>
              {author && currentUser === author._id ? (
                <>
                  <div className={`CampgroundSingleReview-controls--edit`}>
                    <i className='far fa-edit' onClick={handleEdit}></i>
                    {reviewIsEditing && isEdited && <SpinnerLoader />}
                  </div>
                  <div className={`CampgroundSingleReview-controls--delete`}>
                    <i
                      className='far fa-trash-alt'
                      onClick={() => {
                        handleDeleteReview(reviewId);
                        setIsDeleted(true);
                      }}
                    ></i>
                    {isDeleted && <SpinnerLoader />}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className='CampgroundSingleReview-review'>{review}</div>
      </div>
    </>
  );
};
const mapStateToProps = ({ review }) => ({
  reviewIsEditing: review.isEditing,
});

export default connect(mapStateToProps, { ...formActions, ...reviewActions })(
  CampgroundSingleReview
);
