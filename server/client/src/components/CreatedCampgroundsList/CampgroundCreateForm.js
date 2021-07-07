import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import Input from '../FormElements/Input';

import * as formActions from '../../store/actions/form';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from '../../util/validators';

import './CampgroundCreateForm.scss';

const CampgroundCreateForm = ({ validateForm, handleSetUploadedfiles }) => {
  const inputCampgroundHandler = useCallback(
    (id, reviewFormIsValid) => {
      validateForm(id, reviewFormIsValid, 'campground');
    },
    [validateForm]
  );

  return (
    <div className='CampgroundCreateForm'>
      <div>
        <div className='CampgroundCreateForm__title'>
          <Input
            element='input'
            type='text'
            placeholder='title...'
            label='title:'
            errorText='Title should have 5 - 40 characters'
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(40)]}
            onInput={inputCampgroundHandler}
            id='title'
            formName='campground'
          />
        </div>
        <div className='CampgroundCreateForm__location'>
          <Input
            element='input'
            type='text'
            placeholder='location...'
            label='location:'
            errorText='Location should have 5 - 40 characters'
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(40)]}
            onInput={inputCampgroundHandler}
            id='location'
            formName='campground'
          />
        </div>
        <div className='CampgroundCreateForm__description'>
          <Input
            element='textarea'
            type='text'
            rows='5'
            placeholder='your description...'
            label='description:'
            errorText='Description should have 3 - 350 characters'
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(350)]}
            onInput={inputCampgroundHandler}
            id='description'
            formName='campground'
          />
        </div>
        <input
          type='file'
          name='uploadedImages'
          id='imageUpload'
          onChange={handleSetUploadedfiles}
          multiple
        />
        <div className='CampgroundCreateForm__price'>
          <Input
            element='input'
            type='number'
            placeholder='$'
            label='price (US$):'
            errorText='Min 0$'
            validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE()]}
            onInput={inputCampgroundHandler}
            id='price'
            formName='campground'
          />
        </div>
      </div>
    </div>
  );
};

export default connect(null, formActions)(CampgroundCreateForm);
