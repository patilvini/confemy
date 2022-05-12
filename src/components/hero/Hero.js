import React from 'react';
import HeroSketch from '../icons/HeroSketch';
import './hero.styles.scss';

function Hero() {
  return (
    <section className='bg-background'>
      <div className='grid-col-2'>
        <div className='hero-text grid-1st-col'>
          <p className='landing-page-title'>Discover the best</p>
          <p className='landing-huge-title'>Medical conferences</p>
          <button
            style={{ maxWidth: '60%', fontSize: '1.1vw' }}
            className='button button-green'
          >
            Explore Trending Conferences
          </button>
        </div>
        <div className='grid-2nd-col'>
          <HeroSketch className='hero-sketch' />
        </div>
      </div>
    </section>
  );
}

export default Hero;
