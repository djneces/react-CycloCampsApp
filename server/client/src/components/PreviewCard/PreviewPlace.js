import React from 'react';

import './PreviewPlace.scss';

const PreviewPlace = ({ location, country, season, title, temperature }) => {
  return (
    <div className='PreviewPlace'>
      <h3>{location}</h3>
      <strong>{country}</strong>
      <small>{season}</small>
      <span>{title}</span>
      <span>{temperature}</span>
    </div>
  );
};

export default PreviewPlace;
