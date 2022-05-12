import React, { Fragment } from 'react';

function DateIcon({ className }) {
  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 14 14'
      >
        <g fill='none' fillRule='evenodd'>
          <g>
            <g>
              <g>
                <path
                  d='M0 0L14 0 14 14 0 14z'
                  transform='translate(-114.000000, -2143.000000) translate(97.000000, 1913.000000) translate(17.000000, 230.000000)'
                />
                <path
                  fill='#08415C'
                  d='M11.667 1.75h-.584v-.583c0-.321-.262-.584-.583-.584-.32 0-.583.263-.583.584v.583H4.083v-.583c0-.321-.262-.584-.583-.584-.32 0-.583.263-.583.584v.583h-.584c-.641 0-1.166.525-1.166 1.167v9.333c0 .642.525 1.167 1.166 1.167h9.334c.641 0 1.166-.525 1.166-1.167V2.917c0-.642-.525-1.167-1.166-1.167zm-.584 10.5H2.917c-.321 0-.584-.262-.584-.583v-7h9.334v7c0 .32-.263.583-.584.583z'
                  transform='translate(-114.000000, -2143.000000) translate(97.000000, 1913.000000) translate(17.000000, 230.000000)'
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Fragment>
  );
}

export default DateIcon;
