import React, { Fragment, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { alertAction } from '../../redux/alert/alertAction';
import { registerAction } from '../../redux/auth/authAction';

import './register.styles.scss';

const Register = ({ alertAction, registerAction, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
    accountType: '',
    accept: false,
  });

  const { userName, email, password, password2, accountType, accept } =
    formData;
  const history = useHistory();

  const onInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  // validate email
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValidation = emailRegex.test(email.toLowerCase());
  // validate password
  const comparePasswords = password !== password2;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const passwordValidation = passwordRegex.test(password);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // require user name
    if (userName === '')
      return alertAction(
        'Please provide first and last name or company name',
        'danger'
      );
    //  email validation
    if (!emailValidation) return alertAction('Invalid Email', 'danger');
    // passowrd validation
    if (comparePasswords)
      return alertAction('Passwords do not match', 'danger');
    if (!passwordValidation)
      return alertAction(
        'Password: 6 to 20 characters, at least 1 number, 1 uppercase & 1 lowercase letter ',
        'danger'
      );
    // making sure accout type is selected
    if (accountType === '')
      return alertAction('Please select account type', 'danger');
    // making sure one accepts terms and privacy policies
    if (!accept)
      return alertAction(
        'To register you must accpet the "Terms & Privacy Policies" ',
        'danger'
      );
    const formData = { userName, email, password, accountType, accept };
    registerAction(formData, history);
    // instead of redirecting here righaway, we are passing history in action creater
    // as second argument and we will do redirect if registration successful in action creater
    // history.push('/message');
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Fragment>
      <div className='mid-float-container'>
        <div className='large text-primary mb-2'>
          <p>Register</p>
        </div>
        <div className='lead mb-2'>
          <p>
            <i className='icon'></i>Sign up using your email
          </p>
        </div>
        <form onSubmit={onFormSubmit} className='login-form'>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Your name or comapany name'
              name='userName'
              value={userName}
              onChange={onInputChange}
            />
          </div>
          <div className='mb-1'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              required
              onChange={onInputChange}
            />
          </div>
          <div className='mb-1'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              required
              onChange={onInputChange}
            />
          </div>
          <div className='mb-1'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              required
              onChange={onInputChange}
            />
          </div>
          <div className='mb-1'>
            <select
              name='accountType'
              value={accountType}
              onChange={onInputChange}
            >
              <option value=''>Select an account type</option>
              <option value='attendee'>Attendee/Speaker</option>
              <option value='organizer'>Organizer</option>
            </select>
          </div>
          <div className='terms-policy'>
            <input
              type='checkbox'
              id='terms-policy'
              name='accept'
              checked={accept}
              onChange={onInputChange}
            />
            <span>
              <Link className='ml-1' to='#'>
                Accept <span className='text-red'>Terms & Privancy Policy</span>
              </Link>
            </span>
          </div>
          <div className='mb-1'>
            <input className='button button-primary' type='submit' />
          </div>
        </form>

        <div className='mb-2'>
          <p>
            Already have an account ?
            <Link className='text-red ml-1' to='/Login'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  alertAction: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { alertAction, registerAction })(
  Register
);
