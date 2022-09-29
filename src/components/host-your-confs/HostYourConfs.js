import React from 'react';
import HostYourConfSketch from '../icons/HostYourConfSketch';
import './hostYourConfs.styles.scss';
function HostYourConfs(props) {
  return (
    <section className=' grid-col-2 host-your-conference '>
      <div style={{ margin: 'auto 0 auto 13.8rem' }} className='grid-1st-col'>
        <h1>
          Plan and Host your <br /> conference for FREE
        </h1>
        <button style={{ marginTop: '2.8rem' }} className='button button-green'>
          Host your conference
        </button>
      </div>
      <div
        style={{ margin: '4.5rem 23.7rem 7.4rem 5.3rem' }}
        className='grid-2nd-col'
      >
        <HostYourConfSketch className='host-your-conference-sketch' />
      </div>
    </section>
  );
}

export default HostYourConfs;
