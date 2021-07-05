import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CampgroundCreateForm from '../CreatedCampgroundsList/CampgroundCreateForm';
import Button from '../../components/FormElements/Button';
import * as imageActions from '../../store/actions/imageUpload';
import * as campgroundActions from '../../store/actions/campgrounds';
import * as formActions from '../../store/actions/form';

import './NewCampgroundForm.scss';

const NewCampgroundForm = ({
  title,
  location,
  description,
  price,
  createCampground,
  clearForm,
  formIsValid,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(null);

  const history = useHistory();

  const handleOnSubmit = () => {
    const formData = handleOnUploadImages();
    createCampground(title, location, description, price, formData, history);
    clearForm();
  };

  const handleSetUploadedfiles = (e) => {
    setUploadedFiles(e.target.files);
  };

  const handleOnUploadImages = () => {
    const formData = new FormData();

    // To upload multiple files
    if (uploadedFiles.length !== 0) {
      for (const singleImage of uploadedFiles) {
        formData.append('uploadedImages', singleImage);
      }
    }
    return formData;
  };

  return (
    <div className='NewCampgroundForm'>
      <div className='NewCampgroundForm__heading'>
        <h3>Create a new campground</h3>
      </div>
      <div className='NewCampgroundForm__body'>
        <CampgroundCreateForm handleSetUploadedfiles={handleSetUploadedfiles} />
      </div>
      <div className='NewCampgroundForm__footer'>
        <Button
          inverse
          onClick={handleOnSubmit}
          disabled={!(formIsValid && uploadedFiles !== null)}
        >
          Save your campground
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ form }) => ({
  title: form.campground.title.value,
  location: form.campground.location.value,
  description: form.campground.description.value,
  price: form.campground.price.value,
  formIsValid: form.campground.isValid,
});

export default connect(mapStateToProps, {
  ...imageActions,
  ...campgroundActions,
  ...formActions,
})(NewCampgroundForm);
