import moment from 'moment';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from '../UIElements/Modal';
import CampgroundUpdateForm from '../CampgroundUpdateForm/CampgroundUpdateForm';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import * as reviewActions from '../../store/actions/review';

import './CampgroundSingleReview.scss';

const CampgroundSingleReview = ({
  author,
  rating,
  review,
  createdAt,
  currentUser,
  reviewId,
  campgroundId,
  handleClick,
  disableForm,
  fetchOneReview,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);

    // Hiding the underlying form when modal is open
    disableForm();
  };

  return (
    <>
      <Modal
        show={openModal}
        onCancel={handleToggleModal}
        header='Update your review'
      >
        <CampgroundUpdateForm
          reviewId={reviewId}
          campgroundId={campgroundId}
          prevReview={review}
          prevRating={rating}
          handleToggleModal={handleToggleModal}
          openModal={openModal}
        />
      </Modal>
      <div className='CampgroundSingleReview'>
        <div className='CampgroundSingleReview-container'>
          <div>
            <div className='CampgroundSingleReview-author'>
              {author.username}
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
            <div
              className={`CampgroundSingleReview-delete ${
                isDeleted ? 'isDeleted' : ''
              }`}
            >
              {currentUser === author._id ? (
                <>
                  <i
                    className='far fa-edit'
                    onClick={() => {
                      fetchOneReview(campgroundId, reviewId);
                      handleToggleModal();
                    }}
                  ></i>
                  <i
                    className='far fa-trash-alt'
                    onClick={() => {
                      handleClick(reviewId);
                      setIsDeleted(true);
                    }}
                  >
                    {isDeleted && <SpinnerLoader />}
                  </i>
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

const mapStateToProps = ({ form }) => ({
  // review: form.review.review.value,
  // rating: form.review.review.stars,
});

export default connect(mapStateToProps, reviewActions)(CampgroundSingleReview);
