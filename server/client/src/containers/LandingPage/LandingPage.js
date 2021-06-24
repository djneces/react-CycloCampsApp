import React from 'react';
import heroImage from '../../assets/images/landing-campsite-1.jpg';
import heroImage2 from '../../assets/images/landing-campsite-2.jpg';
import heroImage3 from '../../assets/images/landing-campsite-3.jpg';
import heroImage4 from '../../assets/images/landing-campsite-4.jpg';
import heroImage5 from '../../assets/images/landing-campsite-5.jpg';
import map from '../../assets/images/map-white.png';

import PreviewCard from '../../components/PreviewCard/PreviewCard';
import Image from '../../components/UIElements/Image';
import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <section className='LandingPage__hero'>
        <Image image={heroImage} alt='HeroImage' />
        <div className='LandingPage__hero-heading'>
          <h1>Go on adventure, cross Europe on bike </h1>
        </div>
      </section>
      <section className='LandingPage__campReview'>
        <PreviewCard image={heroImage2} campground='Wagenburg' />
      </section>
      <section className='LandingPage__hero2'>
        <Image image={heroImage3} alt='HeroImage2' />
      </section>
      <section className='LandingPage__campReview'>
        <PreviewCard image={heroImage4} campground='Herlequins' reverse />
      </section>
      <section className='LandingPage__hero3'>
        <Image image={heroImage5} alt='HeroImage3' />
      </section>
      <section className='LandingPage__hero4'>
        <Image image={map} alt='Map' />
        <h1>
          You choose the adventure,<br></br>
          <span>connect</span> with us
        </h1>
      </section>
    </div>
  );
};

export default LandingPage;
