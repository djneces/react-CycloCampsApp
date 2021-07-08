import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as campgroundActions from '../../store/actions/campgrounds';
import * as formActions from '../../store/actions/form';
import * as imageActions from '../../store/actions/image';
import Button from '../FormElements/Button';
import Image from '../UIElements/Image';
import Modal from '../UIElements/Modal';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import LineLoader from '../UIElements/LineLoader';
import CampgroundCreateForm from './CampgroundCreateForm';
import ImageGallery from './ImageGallery/ImageGallery';

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
  campgroundIsLoading,
  imageIsLoading,
  imageIsDeleting,
  deleteImage,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(null);

  const history = useHistory();

  // Resize images to display
  const resizedImages = images.map((img) => {
    // if image coming from Cloudinary, resize (amend the URL), for programmatic seed I use unsplash
    if (img.includes('cloudinary')) {
      const imageUrlSplit = img.split('/upload/');
      return `${imageUrlSplit[0]}/upload/c_fill,g_auto,h_900,w_1600/${imageUrlSplit[1]}`;
    }
    return img;
  });

  // Loading image spinner
  const imageLoaded = () => {
    setLoaded(true);
  };

  const handleToggleModal = (type) => {
    if (type === 'delete') setOpenDeleteModal((prevState) => !prevState);
    if (type === 'edit') setOpenEditModal((prevState) => !prevState);
    if (type === 'images') setOpenImagesModal((prevState) => !prevState);

    if (openEditModal) {
      clearForm();
    }
  };

  const handleDelete = () => {
    handleToggleModal('delete');
    handleDeleteCampground(campgroundId, images);
    setIsDeleted(true);
  };

  const handleEdit = () => {
    fetchOneCampground(campgroundId);
    handleToggleModal('edit');
    setIsEdited(true);
    clearForm();
  };

  const handleSubmitEdit = () => {
    const formData = handleOnUploadImages();
    updateCampground(
      campgroundId,
      currentUser._id,
      newLocation,
      newTitle,
      newDescription,
      newPrice,
      formData
    );
    handleToggleModal('edit');
  };

  const handleSetUploadedfiles = (e) => {
    setUploadedFiles(e.target.files);
  };

  const handleOnUploadImages = () => {
    if (!uploadedFiles) return;
    const formData = new FormData();

    // To upload multiple files
    if (uploadedFiles.length !== 0) {
      for (const singleImage of uploadedFiles) {
        formData.append('uploadedImages', singleImage);
      }
    }
    return formData;
  };

  const handleDeleteImage = (image) => {
    deleteImage(image, campgroundId, currentUser._id);
  };

  // Reset edited back to false after while, in case I edit another campground right after
  useEffect(() => {
    let changeEditStatus;
    if (!openEditModal && !imageIsLoading) {
      changeEditStatus = setTimeout(() => {
        setIsEdited(false);
      }, 2000);
    }
    return () => clearInterval(changeEditStatus);
  }, [openEditModal, imageIsLoading]);

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
          <CampgroundCreateForm
            handleSetUploadedfiles={handleSetUploadedfiles}
          />
          <Button
            inverse
            disabled={!campgroundFormIsValid}
            onClick={handleSubmitEdit}
          >
            Save Changes
          </Button>
        </div>
      </Modal>

      {/* Images Modal  */}
      <Modal
        show={openImagesModal}
        onCancel={() => handleToggleModal('images')}
        header='Your pictures'
      >
        <div className='CreatedCampground__imagesModal'>
          <>
            {imageIsDeleting || imageIsLoading ? (
              <div className='CreatedCampground__imagesModal-loader'>
                <LineLoader />
              </div>
            ) : null}
            {campgroundIsLoading ? (
              <SpinnerLoader />
            ) : (
              <ImageGallery
                images={images}
                handleDeleteImage={handleDeleteImage}
                campgroundId={campgroundId}
                userId={currentUser._id}
              />
            )}
          </>
        </div>
      </Modal>

      <div className='CreatedCampground'>
        <div
          className='CreatedCampground__image'
          onClick={() => history.push(`/campgrounds/${campgroundId}`)}
        >
          {campgroundIsEditing && isEdited && imageIsLoading && (
            <div className='CreatedCampground__loader'>
              <LineLoader />
            </div>
          )}
          {loaded ? null : (
            <div className='CreatedCampground__image-notLoaded'>
              <i className='fas fa-spinner fa-pulse'></i>
            </div>
          )}
          <Image
            image={resizedImages.length > 0 ? resizedImages[0] : undefined}
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
          <div className='CreatedCampground__controls--images'>
            <i
              className='far fa-images'
              onClick={() => {
                setOpenImagesModal(true);
              }}
            ></i>
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

const mapStateToProps = ({ campgrounds, form, auth, image }) => ({
  selectedCampground: campgrounds.selectedCampground.campground,
  campgroundFormIsValid: form.campground.isValid,
  newDescription: form.campground.description.value,
  newPrice: form.campground.price.value,
  newTitle: form.campground.title.value,
  newLocation: form.campground.location.value,
  currentUser: auth.currentUser?.user,
  campgroundIsEditing: campgrounds.isEditing,
  campgroundIsLoading: campgrounds.isLoading,
  imageIsLoading: image.isLoading,
  imageIsDeleting: image.isDeleting,
});

export default connect(mapStateToProps, {
  ...formActions,
  ...campgroundActions,
  ...imageActions,
})(CreatedCampground);
