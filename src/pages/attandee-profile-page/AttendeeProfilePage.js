import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileAction } from '../../redux/profile/profileAction';
import AttendeeProfile from '../../components/attendee-profile/AttendeeProfile';
import Spinner from '../../components/spinner/Spinner';
import NoProfile from '../../components/no-profile/NoProfile';

const AttendeeProfilePage = ({
  getProfileAction,
  profile: { profile, isLoading },
  auth: { user },
}) => {
  useEffect(() => {
    getProfileAction();
  }, [getProfileAction]);

  return (
    <Fragment>
      <div className='right-max-container'>
        {isLoading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            {profile !== null ? <AttendeeProfile /> : <NoProfile />}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

AttendeeProfilePage.propType = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileAction })(
  AttendeeProfilePage
);
