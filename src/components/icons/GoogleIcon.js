import React, { Fragment } from 'react';
import googleLogo from '../../assets/googlelogo.png';

const GoogleIcon = ({ className }) => {
  return (
    <Fragment>
      <img className={className} src={googleLogo} alt='google logo' />
    </Fragment>
  );
};

export default GoogleIcon;
