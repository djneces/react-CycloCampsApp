import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import StarRating from '../UIElements/StarRating';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import * as formActions from '../../store/actions/form';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../util/validators';

import './CampgroundReviewForm.scss';

const CampgroundReviewForm = ({
  reviewIsLoading,
  reviewFormIsValid,
  validateForm,
  handleReviewSubmit,
  rating,
  hideFormUnder,
}) => {
  const inputReviewHandler = useCallback(
    (id, reviewFormIsValid) => {
      validateForm(id, reviewFormIsValid, 'review');
    },
    [validateForm]
  );

  return (
    <div className='CampgroundReviewForm'>
      {/* hideFormUnder needed for CampgroundReviews.js */}
      {!hideFormUnder ? (
        <>
          <Input
            element='textarea'
            type='text'
            placeholder='your review...'
            errorText='Review should have 3 - 250 characters'
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(250)]}
            onInput={inputReviewHandler}
            id='review'
            formName='review'
          />
          <div>
            <StarRating rating={rating} />
            {reviewIsLoading && <SpinnerLoader />}
            <Button
              inverse
              onClick={handleReviewSubmit}
              disabled={!reviewFormIsValid}
            >
              Submit review
            </Button>
          </div>
        </>
      ) : (
        <div className='CampgroundReviewForm-disabled'>
          Updating your review
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ review, form }) => ({
  reviewIsLoading: review.isLoading,
  reviewFormIsValid: form.review.isValid,
});

export default connect(mapStateToProps, formActions)(CampgroundReviewForm);
