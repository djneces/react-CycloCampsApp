import React, { useState } from 'react';
import Image from '../UIElements/Image';
import Button from '../FormElements/Button';

import './CampgroundsListItem.scss';

const CampgroundsListItem = ({
  title,
  images,
  ratingsAverage,
  ratingsQuantity,
  location,
  price,
  id,
  history,
}) => {
  const [loaded, setLoaded] = useState(false);

  const imageLoaded = () => {
    setLoaded(true);
  };

  let imageUrl;
  if (images.length > 0) {
    imageUrl = images[0].url;
  }

  return (
    <div className='CampgroundsListItem'>
      <div className='CampgroundsListItem__image'>
        {loaded ? null : (
          <div className='CampgroundsListItem__image-notLoaded'>
            <i className='fas fa-spinner fa-pulse'></i>
          </div>
        )}
        <Image
          image={imageUrl}
          alt='CampgroundImage'
          imageLoaded={imageLoaded}
        />
      </div>

      <div className='CampgroundsListItem__body'>
        <div className='CampgroundsListItem__body-ratingsAverage'>
          <i className='fas fa-star'></i>
          <span>{ratingsAverage}</span>
          <span>({ratingsQuantity})</span>
        </div>
        <div>
          <div className='CampgroundsListItem__body-title'>{title}</div>
          <div className='CampgroundsListItem__body-location'>{location}</div>
        </div>
        <div className='CampgroundsListItem__body-price'>
          <div>$ {price}</div>
        </div>
        <div className='CampgroundsListItem__body-details'>
          <Button inverse onClick={() => history.push(`/campgrounds/${id}`)}>
            <span>More Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampgroundsListItem;
