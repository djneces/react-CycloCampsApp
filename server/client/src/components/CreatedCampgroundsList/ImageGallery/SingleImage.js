import React, { useState } from 'react';
import Image from '../../UIElements/Image';

import './SingleImage.scss';

const SingleImage = ({ image, imagesArr, handleDeleteImage }) => {
  // https://res.cloudinary.com/demo/image/upload/c_crop,h_200,w_300/sample.jpg
  // Resize img
  let resizedImage;
  if (image.includes('cloudinary')) {
    const imageUrlSplit = image.split('/upload/');
    resizedImage = `${imageUrlSplit[0]}/upload/c_fill,g_auto,h_400,w_600/${imageUrlSplit[1]}`;
  } else {
    resizedImage = image;
  }

  const [loaded, setLoaded] = useState(false);

  const imageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className='SingleImage'>
      {loaded ? null : (
        <div className='SingleImage__notLoaded'>
          <i className='fas fa-spinner fa-pulse'></i>
        </div>
      )}
      <Image
        image={resizedImage}
        alt='Gallery-image'
        imageLoaded={imageLoaded}
      />
      {/* Last image not deletable  */}
      {imagesArr.length > 1 && (
        <i
          className='far fa-trash-alt'
          onClick={() => handleDeleteImage(image)}
        ></i>
      )}
    </div>
  );
};

export default SingleImage;
