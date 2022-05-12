import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';

import { logoutAction } from '../../redux/auth/authAction';

import './onavbar.styles.scss';

const Navbar = ({
  logoutAction,
  auth: { isAuthenticated, isLoading, user },
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link
          to={
            user && user.accountType === 'organizer'
              ? '/organizer-dashboard'
              : '/attendee-dashboard'
          }
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link to='/q'>Find CME</Link>
      </li>
      <li>
        <Link to='/contact'>Contact</Link>
      </li>
      <li>
        <Link to='/' onClick={logoutAction}>
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='#!'>List a Conference</Link>
      </li>
      <li>
        <Link to='/q'>Find CME</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/contact'>Contact</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='navbar bg-primary-transparent'>
        <h1>
          <Link to='/'>CME House</Link>
        </h1>
        {!isLoading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      {user && isAuthenticated && <Sidebar />}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logoutAction })(Navbar);
