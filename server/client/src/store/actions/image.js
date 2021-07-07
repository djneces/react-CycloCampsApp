import axios from 'axios';
import {
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_DELETE_START,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
} from './actionTypes';

import { fetchAllCampgrounds } from './campgrounds';

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

//******************************* *
// Start deleting image
export const deleteImageStart = () => ({
  type: IMAGE_DELETE_START,
});

// Deleting image success
export const deleteImageSuccess = () => {
  return {
    type: IMAGE_DELETE_SUCCESS,
  };
};

// Deleting image fail
export const deleteImageFail = (error) => ({
  type: IMAGE_DELETE_FAIL,
  payload: error,
});

// Delete image
export const deleteImage =
  (imgUrl, campgroundId, currentUserId) => async (dispatch) => {
    dispatch(deleteImageStart());
    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    axios
      .patch(
        `/api/campgrounds/upload-images`,
        { image: imgUrl, campgroundId },
        options
      )
      .then((res) => {
        //TODO alert
        if (res.status === 200) {
          dispatch(deleteImageSuccess());
        } else {
          new Error('Something went wrong');
        }
      })
      .then(() => {
        dispatch(fetchAllCampgrounds(null, null, currentUserId));
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          dispatch(deleteImageFail(error.response.data.message));
          //TODO alert
        } else {
          console.error(error.message);
          dispatch(deleteImageFail(error.message));
        }
      });
  };
