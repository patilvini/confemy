import React from 'react';

function BackIcon({ className, fill }) {
  return (
    <svg
      className={className}
        width='38px'
        height='38px'
      viewBox='0 0 38 38'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <title>icon/back/gray1</title>
      <g
        id='icon/back/gray1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='chevron_left_black_24dp'>
          <polygon id='Path' points='0 0 38 0 38 38 0 38'></polygon>
          <path
            d='M23.5558087,10.4711409 C22.9635535,9.84295302 22.0068337,9.84295302 21.4145786,10.4711409 L14.4441913,17.8644295 C13.8519362,18.4926174 13.8519362,19.5073826 14.4441913,20.1355705 L21.4145786,27.5288591 C22.0068337,28.157047 22.9635535,28.157047 23.5558087,27.5288591 C24.1480638,26.9006711 24.1480638,25.885906 23.5558087,25.2577181 L17.6636295,18.9919463 L23.5558087,12.7422819 C24.1480638,12.114094 24.1328778,11.0832215 23.5558087,10.4711409 Z'
            id='Path'
            fill={fill}
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default BackIcon;
