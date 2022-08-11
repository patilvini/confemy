import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LocationIcon = ({ className , fill}) => {

  if(!fill){
    fill = '#08415c'

  }
  return (
    <Fragment>
      <svg
        className={className}
        viewBox='0 0 20 20'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <title>icon/location</title>
        <g
          id='icon/location'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g id='place_black_24dp'>
            <rect id='Rectangle' x='0' y='0' width='20' height='20'></rect>
            <path
              d='M10,1.66666667 C6.5,1.66666667 3.33333333,4.35 3.33333333,8.5 C3.33333333,11.15 5.375,14.2666667 9.45,17.8583333 C9.76666667,18.1333333 10.2416667,18.1333333 10.5583333,17.8583333 C14.625,14.2666667 16.6666667,11.15 16.6666667,8.5 C16.6666667,4.35 13.5,1.66666667 10,1.66666667 Z M10,10 C9.08333333,10 8.33333333,9.25 8.33333333,8.33333333 C8.33333333,7.41666667 9.08333333,6.66666667 10,6.66666667 C10.9166667,6.66666667 11.6666667,7.41666667 11.6666667,8.33333333 C11.6666667,9.25 10.9166667,10 10,10 Z'
              id='Shape'
              fill={fill}
            ></path>
          </g>
        </g>
      </svg>
    </Fragment>
  );
};

LocationIcon.propTypes = {};

export default LocationIcon;
