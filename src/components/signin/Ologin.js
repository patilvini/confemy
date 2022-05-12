import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAction } from '../../redux/auth/authAction';

import './ologin.styles.scss';

const Login = ({ loginAction, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFormSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    loginAction(loginData);
  };

  if (isAuthenticated) {
    return user && user.accountType === 'organizer' ? (
      <Redirect to='/organizer-dashboard' />
    ) : (
      <Redirect to='/attendee-dashboard' />
    );
  }

  // if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div className='mid-float-container'>
      <div className='large text-primary mb-2'>
        <p>Login</p>
      </div>
      <div className='lead mb-2'>
        <p>
          <i className='icon'></i>Sign in using your email
        </p>
      </div>
      <form onSubmit={onFormSubmit} className='login-form'>
        <div className='mb-1'>
          <input
            required
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className='mb-1'>
          <input
            required
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onInputChange}
          />
        </div>
        <div className='mb-1'>
          <input className='button button-primary' type='submit' />
        </div>
      </form>
      <div>
        <p>
          Forgot password ?
          <Link className='text-red ml-1' to='#'>
            Reset
          </Link>
        </p>
      </div>
      <div className='mb-2'>
        <p>
          Don't have an account ?
          <Link className='text-red ml-1' to='/register'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { loginAction })(Login);
