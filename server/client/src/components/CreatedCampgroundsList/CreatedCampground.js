import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as campgroundActions from '../../store/actions/campgrounds';
import * as formActions from '../../store/actions/form';
import Button from '../FormElements/Button';
import Image from '../UIElements/Image';
import Modal from '../UIElements/Modal';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import CampgroundCreateForm from './CampgroundCreateForm';

import './CreatedCampground.scss';

const CreatedCampground = ({
  title,
  location,
  images,
  campgroundId,
  handleDeleteCampground,
  fetchOneCampground,
  campgroundFormIsValid,
  clearForm,
  updateCampground,
  currentUser,
  newDescription,
  newTitle,
  newLocation,
  newPrice,
  campgroundIsEditing,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  // Loading image spinner
  const imageLoaded = () => {
    setLoaded(true);
  };

  const handleToggleModal = (type) => {
    if (type === 'delete') setOpenDeleteModal((prevState) => !prevState);
    if (type === 'edit') setOpenEditModal((prevState) => !prevState);

    if (openEditModal) {
      clearForm();
    }
  };

  const handleDelete = () => {
    handleToggleModal('delete');
    handleDeleteCampground(campgroundId);
    setIsDeleted(true);
  };

  const handleEdit = () => {
    fetchOneCampground(campgroundId);
    handleToggleModal('edit');
    setIsEdited(true);
  };

  const handleSubmitEdit = () => {
    updateCampground(
      campgroundId,
      currentUser._id,
      newLocation,
      newTitle,
      newDescription,
      newPrice
    );
    handleToggleModal('edit');
  };

  return (
    <>
      {/* Delete Modal  */}
      <Modal
        show={openDeleteModal}
        onCancel={() => handleToggleModal('delete')}
        header='Are you sure to delete this record?'
      >
        <div className='CreatedCampground__deleteModal'>
          <Button onClick={handleDelete}>Yes</Button>
          <Button inverse onClick={() => handleToggleModal('delete')}>
            No
          </Button>
        </div>
      </Modal>

      {/* Edit Modal  */}
      <Modal
        show={openEditModal}
        onCancel={() => handleToggleModal('edit')}
        header='Please edit the details'
      >
        <div className='CreatedCampground__editModal'>
          <CampgroundCreateForm />
          <Button
            inverse
            disabled={!campgroundFormIsValid}
            onClick={handleSubmitEdit}
          >
            Save Changes
          </Button>
        </div>
      </Modal>
      <div className='CreatedCampground'>
        <div
          className='CreatedCampground__image'
          onClick={() => history.push(`/campgrounds/${campgroundId}`)}
        >
          {loaded ? null : (
            <div className='CreatedCampground__image-notLoaded'>
              <i className='fas fa-spinner fa-pulse'></i>
            </div>
          )}
          <Image
            image={images.length > 0 ? images[0].url : undefined}
            alt={title}
            imageLoaded={imageLoaded}
          />
        </div>
        <div onClick={() => history.push(`/campgrounds/${campgroundId}`)}>
          <div className='CreatedCampground__title'>{title}</div>
          <div className='CreatedCampground__location'>{location}</div>
        </div>
        <div className='CreatedCampground__controls'>
          <div className='CreatedCampground__controls--edit'>
            <i className='far fa-edit' onClick={handleEdit}></i>
            {isEdited && campgroundIsEditing && <SpinnerLoader />}
          </div>
          <div className='CreatedCampground__controls--delete'>
            <i
              className='far fa-trash-alt'
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            ></i>
            {isDeleted && <SpinnerLoader />}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ campgrounds, form, auth }) => ({
  selectedCampground: campgrounds.selectedCampground.campground,
  campgroundFormIsValid: form.campground.isValid,
  newDescription: form.campground.description.value,
  newPrice: form.campground.price.value,
  newTitle: form.campground.title.value,
  newLocation: form.campground.location.value,
  currentUser: auth.currentUser?.user,
  campgroundIsEditing: campgrounds.isEditing,
});

export default connect(mapStateToProps, {
  ...formActions,
  ...campgroundActions,
})(CreatedCampground);
