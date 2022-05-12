import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { profileSelector } from "../../redux/profile/profileSelector";

import "./attendeeProfile.styles.scss";

function AttendeeProfile({ profile }) {
  const { user, occupation, specialty, subSpecialty, degrees } = profile;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="edit-profile mt-2">{user.name.toUpperCase()}</div>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Occupation:</td>
            <td>{occupation}</td>
          </tr>
          <tr>
            <td>Specialty:</td>
            <td>{specialty}</td>
          </tr>
          <tr>
            <td>Sub Specialty:</td>
            <td>{subSpecialty}</td>
          </tr>
          <tr>
            <td>Degree:</td>
            <td>
              {degrees &&
                degrees.map((degree, index) => (
                  <span key={index}>{degree}</span>
                ))}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="edit-profile mt-2">
        <button
          onClick={() => navigate("/attendee-dashboard/edit-attendee-profile")}
          className="button button-primary"
        >
          Edit Profile
        </button>
      </div>
    </Fragment>
  );
}

AttendeeProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: profileSelector(state),
  // profile: state.profile.profile,
});

export default connect(mapStateToProps)(AttendeeProfile);

// import React, { useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { getProfileAction } from '../../redux/profile/profileAction';
// import Spinner from '../spinner/Spinner';
// import Button from '../button/Button';
// import NoProfile from '../no-profile/NoProfile';

// const AttendeeProfile = ({
//   getProfileAction,
//   profile: { profile, isLoading },
//   auth: { user },
// }) => {
//   useEffect(() => {
//     getProfileAction();
//   }, []);

//   return isLoading && profile === null ? (
//     <Spinner />
//   ) : (
//     <div className='right-max-container'>
//       {/*<p>
//         Welcome{' '}
//         {user && (typeof user.name === 'undefined' ? user.email : user.name)}
//      </p> */}
//       {profile !== null ? <Fragment>has profile</Fragment> : <NoProfile />}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });

// export default connect(mapStateToProps, { getProfileAction })(AttendeeProfile);
