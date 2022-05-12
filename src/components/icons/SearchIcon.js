import React, { Fragment } from 'react';

function SearchIcon({ width, height, verticalAlign }) {
  return (
    <Fragment>
      <svg
        width={width}
        height={height}
        viewBox='0 0 20 20'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <title>icon/search</title>
        <g
          id='icon/search'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g id='search_black_24dp'>
            <polygon id='Path' points='0 0 20 0 20 20 0 20'></polygon>
            <path
              d='M12.9166667,11.6666667 L12.2583333,11.6666667 L12.025,11.4416667 C13.025,10.275 13.5416667,8.68333333 13.2583333,6.99166667 C12.8666667,4.675 10.9333333,2.825 8.6,2.54166667 C5.075,2.10833333 2.10833333,5.075 2.54166667,8.6 C2.825,10.9333333 4.675,12.8666667 6.99166667,13.2583333 C8.68333333,13.5416667 10.275,13.025 11.4416667,12.025 L11.6666667,12.2583333 L11.6666667,12.9166667 L15.2083333,16.4583333 C15.55,16.8 16.1083333,16.8 16.45,16.4583333 C16.7916667,16.1166667 16.7916667,15.5583333 16.45,15.2166667 L12.9166667,11.6666667 Z M7.91666667,11.6666667 C5.84166667,11.6666667 4.16666667,9.99166667 4.16666667,7.91666667 C4.16666667,5.84166667 5.84166667,4.16666667 7.91666667,4.16666667 C9.99166667,4.16666667 11.6666667,5.84166667 11.6666667,7.91666667 C11.6666667,9.99166667 9.99166667,11.6666667 7.91666667,11.6666667 Z'
              id='Shape'
              fill='#757575'
            ></path>
          </g>
        </g>
      </svg>
    </Fragment>
  );
}

export default SearchIcon;
