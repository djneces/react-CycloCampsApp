import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as campgroundActions from '../../../store/actions/campgrounds';
import SingleImage from './SingleImage';

import './ImageGallery.scss';

const ImageGallery = ({
  images,
  campgroundId,
  userId,
  handleDeleteImage,
  updateCampground,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(null);

  const handleSetUploadedfiles = (e) => {
    setUploadedFiles(e.target.files);
  };

  useEffect(() => {
    if (uploadedFiles) {
      handleOnUploadImages();
    }
  }, [uploadedFiles]);

  const handleOnUploadImages = () => {
    if (!uploadedFiles) return;
    const formData = new FormData();

    // To upload multiple files
    if (uploadedFiles.length !== 0) {
      for (const singleImage of uploadedFiles) {
        formData.append('uploadedImages', singleImage);
      }
    }

    updateCampground(
      campgroundId,
      userId,
      undefined,
      undefined,
      undefined,
      undefined,
      formData
    );
  };

  return (
    <div className='ImageGallery'>
      <div className='ImageGallery__inputFile'>
        <label htmlFor='addImageInput'>
          <i className='fas fa-plus'></i>
        </label>
        <input
          type='file'
          name='uploadedImages'
          id='addImageInput'
          onChange={(e) => handleSetUploadedfiles(e)}
          multiple
        />
      </div>

      {images.map((image, i) => (
        <SingleImage
          key={i}
          image={image}
          imagesArr={images}
          handleDeleteImage={handleDeleteImage}
        />
      ))}
    </div>
  );
};

export default connect(null, campgroundActions)(ImageGallery);
