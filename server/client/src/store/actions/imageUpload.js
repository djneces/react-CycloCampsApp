import axios from 'axios';

import {
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from './actionTypes';

// Start uploading image
export const uploadImageStart = () => ({
  type: IMAGE_UPLOAD_START,
});

// Uploading image success
export const uploadImageSuccess = (uploadLinks) => {
  return {
    type: IMAGE_UPLOAD_SUCCESS,
    payload: uploadLinks,
  };
};

// Uploading image fail
export const uploadImageFail = (error) => ({
  type: IMAGE_UPLOAD_FAIL,
  payload: error,
});

// Upload image to Cloudinary
export const uploadImages = (formData) => async (dispatch) => {
  dispatch(uploadImageStart());

  // axios not working well with formData ('Content-Type': 'multipart/form-data')
  //returning cloudinary links (res.data) to be used in ./campgrounds - createCampground action
  const res = await fetch(`/api/campgrounds/upload-images`, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'success') {
        dispatch(uploadImageSuccess(res.data));
        return res.data;
      } else {
        new Error('Something went wrong');
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(uploadImageFail(error.response.data.message));
      } else {
        dispatch(uploadImageFail(error.message));
      }
    });

  return res;
};
