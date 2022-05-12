import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { profileSelector } from "../../redux/profile/profileSelector";

function AttendeeProfile({ profile }) {
  const {
    user,
    about,
    contactName,
    contactEmail,
    contactPhone,
    aim,
    location,
  } = profile;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="edit-profile mt-2">{user.name.toUpperCase()}</div>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Contact Name:</td>
            <td>{contactName}</td>
          </tr>
          <tr>
            <td>Contact Email:</td>
            <td>{contactEmail}</td>
          </tr>
          <tr>
            <td>Contact Phone:</td>
            <td>{contactPhone}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>
              <span>{location.street}</span>
              <br />
              <span>{location.city}, </span>

              <span>{location.state}</span>
              <br />
              <span>{location.country}, </span>
              <span>{location.zipcode}</span>
            </td>
          </tr>
          <tr>
            <td>Objectives:</td>
            <td>
              {aim.map((e, indx) => (
                <span key={indx}>{e}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td>About:</td>
            <td>{about}</td>
          </tr>
        </tbody>
      </table>
      <div className="edit-profile mt-2">
        <button
          onClick={() =>
            navigate("/organizer-dashboard/edit-organizer-profile")
          }
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
