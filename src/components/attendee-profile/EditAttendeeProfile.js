import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createProfileAction } from "../../redux/profile/profileAction";

import PropTypes from "prop-types";
import "./CreateAttendeeProfile.styles.scss";

function EditAttendeeProfile({
  profile: { isLoading, profile },
  createProfileAction,
}) {
  const [formData, setFormData] = useState({
    occupation: "",
    specialty: "",
    subSpecialty: "",
    degrees: "",
  });

  useEffect(() => {
    setFormData({
      occupation: isLoading || !profile.occupation ? "" : profile.occupation,
      specialty: isLoading || !profile.specialty ? "" : profile.specialty,
      subSpecialty:
        isLoading || !profile.subSpecialty ? "" : profile.subSpecialty,
      degrees: isLoading || !profile.degrees ? "" : profile.degrees,
    });
  }, [isLoading]);

  const { occupation, specialty, subSpecialty, degrees } = formData;
  const navigate = useNavigate();
  const onInputChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const onFormSubmit = (event) => {
    let organizer = false;
    const edit = true;
    event.preventDefault();
    createProfileAction(formData, navigate, organizer, edit);
  };

  return (
    <div className="right-max-container">
      <div className="edit-profile mt-2">
        <p>{profile && profile.user.name.toUpperCase()}</p>
      </div>
      <form onSubmit={onFormSubmit}>
        <table className="profile-table">
          <tbody>
            <tr>
              <td>Occupation:</td>
              <td>
                <input
                  type="text"
                  placeholder="*Occupation"
                  name="occupation"
                  value={occupation}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Specialty:</td>
              <td>
                <input
                  type="text"
                  placeholder="*Specialty"
                  name="specialty"
                  value={specialty}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Sub Specialty:</td>
              <td>
                <input
                  type="text"
                  placeholder="Sub-specialty"
                  name="subSpecialty"
                  value={subSpecialty}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Degree:</td>
              <td>
                <input
                  type="text"
                  placeholder="*Degree"
                  name="degrees"
                  value={degrees}
                  onChange={onInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="edit-profile mt-2">
          <button className="button button-primary">Submit Profile</button>{" "}
          <Link to="/attendee-dashboard/profile">
            <button className="button button-border-primary ">Go Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

EditAttendeeProfile.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfileAction,
})(EditAttendeeProfile);
