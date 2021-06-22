import React from 'react';
// import heroImage from '../../assets/images/bg-campsite.jpg';
import heroImage2 from '../../assets/images/img1-cyclist.jpg';
import ArrowDownBox from '../../components/ArrowDownBox/ArrowDownBox';
import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <section className='LandingPage__hero'>
        <img
          className='LandingPage__hero-heroImage'
          src={heroImage2}
          alt='Logo'
        />
        <div className='LandingPage__hero-heading'>
          <h1>Go on adventure, cross Europe on bike </h1>
          <ArrowDownBox />
        </div>
      </section>
      <section className='LandingPage__service'></section>
    </div>
  );
};

export default LandingPage;
