import React from 'react';

import './PreviewPlace.scss';

const PreviewPlace = ({ place, country, season }) => {
  return (
    <div className='PreviewPlace'>
      <h3>{place}</h3>
      <strong>{country}</strong>
      <small>{season}</small>
      <span>20°</span>
    </div>
  );
};

export default PreviewPlace;
