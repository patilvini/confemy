import React from 'react';
import DateIcon from '../icons/DateIcon';
import LocationIcon from '../icons/LocationIcon';
import CreditsIcon from '../icons/CreditsIcon';
import LikeInactiveIcon from '../icons/LikeInactiveIcon';

import './ConfCard.styles.scss';

function ConfCard() {
  return (
    <div className='conf-card'>
      <div className='conf-img-container'>
        <img
          src='https://www.simplemost.com/wp-content/uploads/2016/08/beach-vacation-e1470663653924.jpeg'
          alt='conference banner'
        />
      </div>
      <p className='conf-title'>
        The National Conference on Wilderness Medicine. Really Really long
        conference title.
      </p>
      <div>
        <DateIcon className='conf-card-icons' />
        <span className='conf-card-text caption-2-regular-gray3'>
          Wed, May 23, 2021 - 05:00 IST
        </span>
      </div>
      <div className='conf-card-location'>
        <LocationIcon className='conf-card-icons' />
        <span className='conf-card-text caption-2-regular-gray3'>London</span>
      </div>
      <div>
        <CreditsIcon className='conf-card-icons' />
        <span className='conf-card-text caption-2-regular-gray3'>
          AMA Cat 1
        </span>
      </div>
      <div className='conf-price-box'>
        <span className='caption-2-bold-cblack'>$20 onwards</span>
        <LikeInactiveIcon className='conf-likeicon' />
      </div>
    </div>
  );
}

export default ConfCard;
