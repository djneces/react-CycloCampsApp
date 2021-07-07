import React, { useState, useEffect } from 'react';
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
  campgroundImages,
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
    image = selectedCampground.images[0];
    ratingsAverage = selectedCampground.ratingsAverage;
    ratingsQuantity = selectedCampground.ratingsQuantity;
  }

  const [loaded, setLoaded] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  // Moving coords for the carousel
  const [xCoord, setXCoord] = useState(0);

  useEffect(() => {
    if (!profileImg) setProfileImg(image);
  }, [image, profileImg]);

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

  let carouselWidth;
  if (campgroundImages) carouselWidth = campgroundImages.length * 65;
  const moveCarouselLeft = () => {
    const carousel = document.querySelector('#carousel');
    if (xCoord < 0) {
      carousel.style.transform = `translateX(${xCoord + 65}px)`;
      setXCoord(xCoord + 65);
    }
  };

  const moveCarouselRight = () => {
    if (xCoord > -(carouselWidth / 2)) {
      const carousel = document.getElementById('carousel');
      carousel.style.transform = `translateX(${xCoord - 65}px)`;
      setXCoord(xCoord - 65);
    }
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
            {/* Campground profile picture  */}
            <Image
              image={profileImg}
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
              {selectedCampground.images.length > 1 && (
                <div className='CampgroundDetail__card-body-pictures'>
                  {selectedCampground.images.length > 5 && (
                    <i
                      className='fas fa-chevron-left'
                      onClick={() => moveCarouselLeft()}
                    ></i>
                  )}
                  <div
                    className={`CampgroundDetail__card-body-pictures--carousel ${
                      selectedCampground.images.length < 6 ? 'noArrows' : ''
                    }`}
                    id='carousel'
                  >
                    {selectedCampground.images.map((imageUrl, i) => {
                      // https://res.cloudinary.com/demo/image/upload/c_crop,h_200,w_300/sample.jpg
                      const imageUrlSplit = imageUrl.split('/upload/');
                      const resizedImage = `${imageUrlSplit[0]}/upload/h_200,w_300/${imageUrlSplit[1]}`;

                      return (
                        // Thumbnail resized picture
                        <Image
                          key={i}
                          image={resizedImage}
                          alt='CampgroundImage'
                          onClick={() => setProfileImg(imageUrl)}
                        />
                      );
                    })}
                  </div>
                  {selectedCampground.images.length > 5 && (
                    <i
                      className='fas fa-chevron-right'
                      onClick={() => moveCarouselRight()}
                    ></i>
                  )}
                </div>
              )}
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
  campgroundIsLoading: campgrounds.selectedCampground.isLoading,
  campgroundImages: campgrounds.selectedCampground.campground?.images,
});

export default connect(mapStateToProps)(CampgroundDetail);
