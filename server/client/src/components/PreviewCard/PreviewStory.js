import React from 'react';

import './PreviewStory.scss';

const PreviewStory = ({
  place,
  author,
  profession,
  quote1,
  quote2,
  reverse,
}) => {
  return (
    <div className={`PreviewStory ${reverse ? 'reverse' : ''}`}>
      <div className='PreviewStory__heading'>
        <h3>{place}</h3>
      </div>
      <blockquote className='PreviewStory__quote'>
        <p>
          <q>
            {quote1}
            <br></br>
            {quote2}
          </q>
        </p>
      </blockquote>
      <figcaption>
        &mdash; {author}, <em>{profession}</em>
      </figcaption>
    </div>
  );
};

export default PreviewStory;
