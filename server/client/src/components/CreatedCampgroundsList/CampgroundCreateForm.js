import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import Input from '../FormElements/Input';

import * as formActions from '../../store/actions/form';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
} from '../../util/validators';

import './CampgroundCreateForm.scss';

const CampgroundCreateForm = ({ validateForm }) => {
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
        <div className='CampgroundCreateForm__price'>
          <Input
            element='input'
            type='number'
            placeholder='price...'
            label='price (US$):'
            errorText='Min 0$'
            validators={[VALIDATOR_MIN(0)]}
            onInput={inputCampgroundHandler}
            id='price'
            formName='campground'
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ review, form }) => ({
  // reviewIsLoading: review.isLoading,
  // reviewFormIsValid: form.review.isValid,
});

export default connect(mapStateToProps, formActions)(CampgroundCreateForm);
