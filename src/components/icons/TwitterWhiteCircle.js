import React, { Fragment } from 'react';
import twitterWhiteCircle from '../../assets/twitter_white_circle_58.png';

function TwitterWhiteCircle({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={twitterWhiteCircle}
        alt='twitter white circle logo'
      />
    </Fragment>
  );
}

export default TwitterWhiteCircle;
