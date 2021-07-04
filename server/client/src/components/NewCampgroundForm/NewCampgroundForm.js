import React from 'react';

import CampgroundCreateForm from '../CreatedCampgroundsList/CampgroundCreateForm';
import Button from '../../components/FormElements/Button';

import './NewCampgroundForm.scss';

const NewCampgroundForm = () => {
  return (
    <div className='NewCampgroundForm'>
      <div className='NewCampgroundForm__heading'>
        <h3>Create a new campground</h3>
      </div>
      <div className='NewCampgroundForm__body'>
        <CampgroundCreateForm />
      </div>
      <div className='NewCampgroundForm__footer'>
        <Button inverse>Save your campground</Button>
      </div>
    </div>
  );
};

export default NewCampgroundForm;
