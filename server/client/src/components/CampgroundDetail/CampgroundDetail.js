import React, { useState } from 'react';
import { connect } from 'react-redux';

import PreviewPlace from '../PreviewCard/PreviewPlace';
import Image from '../UIElements/Image';
import CampgroundReviews from './CampgroundReviews';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import './CampgroundDetail.scss';

const CampgroundDetail = ({
  selectedCampground,
  campgroundId,
  campgroundIsLoading,
}) => {
  let author,
    title,
    description,
    location,
    price,
    image,
    ratingsAverage,
    ratingsQuantity;

  if (selectedCampground) {
    author = selectedCampground.author;
    title = selectedCampground.title;
    description = selectedCampground.description;
    location = selectedCampground.location;
    price = selectedCampground.price;
    image = selectedCampground.images[0].url;
    ratingsAverage = selectedCampground.ratingsAverage;
    ratingsQuantity = selectedCampground.ratingsQuantity;
  }

  const [loaded, setLoaded] = useState(false);

  const imageLoaded = () => {
    setLoaded(true);
  };

  const renderStarRating = () => {
    const fullStars = parseInt(ratingsAverage, 10);
    // Render half star with a score above .5
    const halfStars = ratingsAverage - fullStars >= 0.5 ? 1 : 0;

    return [
      ...Array.from({ length: fullStars }).map((star, i) => {
        return <i className='fas fa-star' key={`full-${i}`}></i>;
      }),
      ...Array.from({ length: halfStars }).map((star, i) => {
        return <i className='fas fa-star-half' key={`half-${i}`}></i>;
      }),
    ];
  };

  const renderCampgroundDetail = () => {
    if (selectedCampground) {
      return (
        <div className='CampgroundDetail'>
          <div className='CampgroundDetail__image'>
            {loaded ? null : (
              <div className='CampgroundDetail__image-notLoaded'>
                <i className='fas fa-spinner fa-pulse'></i>
              </div>
            )}
            <Image
              image={image}
              alt='CampgroundImage'
              imageLoaded={imageLoaded}
            />
          </div>
          <div className='CampgroundDetail__card'>
            <div className='CampgroundDetail__card-header'>
              <PreviewPlace location={location} title={title} />
            </div>
            <div className='CampgroundDetail__card-body'>
              <div className='CampgroundDetail__card-body-rating'>
                <div className='CampgroundDetail__card-body-rating--stars'>
                  {renderStarRating()}
                </div>
                <span>
                  {ratingsAverage}
                  <span>out of 5</span>
                </span>
                <span>({ratingsQuantity} reviews)</span>
              </div>
              <div className='CampgroundDetail__card-body-author'>
                created by: {author && author.username}
              </div>
              <div className='CampgroundDetail__card-body-description'>
                {description}
              </div>
              <div className='CampgroundDetail__card-body-price'>
                $ {price}
                <span>/night</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='CampgroundDetail'>
          {campgroundIsLoading && <SpinnerLoader />}
          {!campgroundIsLoading && 'Campground not loaded'}
        </div>
      );
    }
  };

  return (
    <>
      {renderCampgroundDetail()}
      <CampgroundReviews campgroundId={campgroundId} />
    </>
  );
};

const mapStateToProps = ({ campgrounds }) => ({
  selectedCampground: campgrounds.selectedCampground.campground,
  campgroundIsLoading: campgrounds.isLoading,
});

export default connect(mapStateToProps)(CampgroundDetail);
