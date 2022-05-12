import React, { Fragment } from 'react';
import GoogleIcon from '../icons/GoogleIcon';
import './registerWgoogle.styles.scss';

function RegisterWGoogle({ label }) {
  return (
    <Fragment>
      <div className='caption-1-regular-cblack or-container'>
        {' '}
        <span className='or-line'></span> OR <span className='or-line'></span>
      </div>
      <div className='signin-social caption-1-medium-cblack'>
        <span>
          <GoogleIcon className='signin-google-icon' />
        </span>
        {label}
      </div>
    </Fragment>
  );
}

export default RegisterWGoogle;
