import React, { Fragment } from 'react';
import facebookWhiteCircle from '../../assets/facebook_white_circle_72.png';

function FacebookWhiteCircle({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={facebookWhiteCircle}
        alt='facebook white circle logo'
      />
    </Fragment>
  );
}

export default FacebookWhiteCircle;
