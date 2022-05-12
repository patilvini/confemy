import React from 'react';
import { Link } from 'react-router-dom';
import TwitterWhiteCircle from '../icons/TwitterWhiteCircle';
import FacebookWhiteCircle from '../icons/FacebookWhiteCircle';
import './footer.styles.scss';

function Footer(props) {
  return (
    <footer className=' footer bg-primary'>
      <div className=' footer-confemy footer-confemy-text  '>confemy</div>
      <div className='footer-social-icons'>
        <FacebookWhiteCircle className='social-whitecircle-icon' />
        <TwitterWhiteCircle className='social-whitecircle-icon' />
        <FacebookWhiteCircle className='social-whitecircle-icon' />
      </div>
      <div className='footer-links'>
        <ul>
          <li>
            <Link className='avenir-roman-18' to='#!'>
              Help
            </Link>
          </li>
          <li>
            <Link className='avenir-roman-18' to='#!'>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link className='avenir-roman-18' to='#!'>
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
