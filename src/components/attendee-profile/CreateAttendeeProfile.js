import React, { useState } from "react";
import { connect } from "react-redux";
import { createProfileAction } from "../../redux/profile/profileAction";
import PropTypes from "prop-types";
import "./CreateAttendeeProfile.styles.scss";
import { useNavigate } from "react-router-dom";

function AttendeeProfileForm({ createProfileAction }) {
  const [formData, setFormData] = useState({
    occupation: "",
    specialty: "",
    subSpecialty: "",
    degrees: "",
  });
  const { occupation, specialty, subSpecialty, degrees } = formData;
  const navigate = useNavigate();
  const onInputChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const onFormSubmit = (event) => {
    let organizer = false;
    let edit = false;
    event.preventDefault();
    createProfileAction(formData, navigate, organizer, edit);
  };

  return (
    <div className="right-max-container">
      <div className="mid-500-form-container ">
        <h2 className="form-heading my-2">Profile</h2>
        <form className="form" onSubmit={onFormSubmit}>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Occupation"
              name="occupation"
              value={occupation}
              onChange={onInputChange}
              //   required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Specialty"
              name="specialty"
              value={specialty}
              onChange={onInputChange}
              //   required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="Sub-specialty"
              name="subSpecialty"
              value={subSpecialty}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Degree"
              name="degrees"
              value={degrees}
              onChange={onInputChange}
              // required
            />
          </div>
          <div className="mb-1">
            <input className="button button-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

AttendeeProfileForm.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
};

export default connect(null, { createProfileAction })(AttendeeProfileForm);
