import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Modal from '../UIElements/Modal';
import Button from '../FormElements/Button';
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleToggleModal = (type) => {
    disableForm();
    if (type === 'delete') setOpenDeleteModal((prevState) => !prevState);
    if (type === 'edit') setOpenEditModal((prevState) => !prevState);

    if (openEditModal) {
      clearForm();
    }
  };

  const handleEdit = () => {
    fetchOneReview(campgroundId, reviewId);
    handleToggleModal('edit');
    setIsEdited(true);
  };

  const handleDelete = () => {
    setIsDeleted(true);
    handleToggleModal('delete');
    handleDeleteReview(reviewId);
  };

  useEffect(() => {
    if (!openEditModal) {
      setTimeout(() => {
        setIsEdited(false);
      }, 2000);
    }
  }, [openEditModal]);

  return (
    <>
      {/* Delete Modal  */}
      <Modal
        show={openDeleteModal}
        onCancel={() => handleToggleModal('delete')}
        header='Are you sure to delete this record?'
      >
        <div className='CreatedCampground__deleteModal'>
          <Button onClick={() => handleDelete()}>Yes</Button>
          <Button inverse onClick={() => handleToggleModal('delete')}>
            No
          </Button>
        </div>
      </Modal>
      {/* Edit Modal  */}
      <Modal
        show={openEditModal}
        onCancel={() => handleToggleModal('edit')}
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
                      onClick={() => handleToggleModal('delete')}
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
