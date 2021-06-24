import React, { useState } from 'react';

import PreviewStory from './PreviewStory';
import PreviewPlace from './PreviewPlace';
import Image from '../UIElements/Image';

import { QUOTES } from '../../assets/quotesFeed/quotesFeed';
import './PreviewCard.scss';

const PreviewCard = ({ image, campground, reverse }) => {
  const [review, setReview] = useState(1);

  const { place, country, season, author, profession, quote1, quote2 } =
    QUOTES[campground][review - 1];

  const onReviewClick = (e) => {
    // Set actual review number
    setReview(+e.target.dataset.reviewnumber);

    // Set active class to current review
    const parent = document.querySelector(
      `${
        !reverse
          ? 'div.PreviewCard__header-options'
          : 'div.PreviewCard__header-options--reverse'
      }`
    );
    parent.querySelectorAll('span').forEach((el) => {
      el.classList.remove('active');
    });
    e.target.className = 'active';
  };

  return (
    <div className={`PreviewCard ${reverse ? 'reverse' : ''}`}>
      <div className='PreviewCard__container'>
        <div className='PreviewCard__header'>
          <div
            className={`PreviewCard__header-options ${
              reverse ? 'PreviewCard__header-options--reverse' : ''
            }`}
          >
            <span onClick={onReviewClick} data-reviewnumber='5'>
              05
            </span>
            <span onClick={onReviewClick} data-reviewnumber='4'>
              04
            </span>
            <span onClick={onReviewClick} data-reviewnumber='3'>
              03
            </span>
            <span onClick={onReviewClick} data-reviewnumber='2'>
              02
            </span>
            <span
              onClick={onReviewClick}
              data-reviewnumber='1'
              className='active'
            >
              01
            </span>
          </div>
        </div>
        <Image image={image} alt='Campsite' />
        <PreviewStory
          place={place}
          author={author}
          profession={profession}
          quote1={quote1}
          quote2={quote2}
          reverse={reverse}
        />
        <PreviewPlace place={place} country={country} season={season} />
      </div>
    </div>
  );
};

export default PreviewCard;
