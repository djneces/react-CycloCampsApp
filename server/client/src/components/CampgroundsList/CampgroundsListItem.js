import React, { useState } from 'react';
import { connect } from 'react-redux';

import Image from '../UIElements/Image';
import Button from '../FormElements/Button';
import pinIconMap from '../../assets/images/pin.png';
import { fetchOneCampgroundCoords } from '../../store/actions/campgrounds';

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
  geometry,
  fetchOneCampgroundCoords,
}) => {
  const [loaded, setLoaded] = useState(false);

  const imageLoaded = () => {
    setLoaded(true);
  };

  let imageUrl;
  if (images.length > 0) {
    imageUrl = images[0];
  }

  return (
    <div className='CampgroundsListItem' id={id}>
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
      <div
        className='CampgroundsListItem__body-icon'
        onClick={() => fetchOneCampgroundCoords(geometry)}
      >
        <Image image={pinIconMap} alt='camp-icon' />
      </div>
    </div>
  );
};

export default connect(null, { fetchOneCampgroundCoords })(CampgroundsListItem);
