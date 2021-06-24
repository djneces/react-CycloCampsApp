import React from 'react';

import './Image.scss';

const Image = (props) => {
  return (
    <div className={`Image ${props.className || ''}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Image;
