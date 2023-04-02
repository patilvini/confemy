import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createProfileAction } from "../../redux/profile/profileAction";
import PropTypes from "prop-types";
// import './CreateAttendeeProfile.styles.scss';

function CreateOrganizerProfile({ createProfileAction }) {
  const [formData, setFormData] = useState({
    about: "",
    aim: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const {
    about,
    aim,
    contactName,
    contactEmail,
    contactPhone,
    street,
    city,
    state,
    zipcode,
    country,
  } = formData;
  const navigate = useNavigate();
  const onInputChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const onFormSubmit = (event) => {
    let organizer = true;
    let edit = false;
    event.preventDefault();
    createProfileAction(formData, navigate, organizer, edit);
  };

  return (
    <div className="right-max-container">
      <div className="mid-500-form-container ">
        <h2 className="form-heading my-2">Profile</h2>
        <p className="mt-2 mb-1">Designated Contact:</p>
        <form className="form" onSubmit={onFormSubmit}>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Designated Contact Name"
              name="contactName"
              value={contactName}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="email"
              placeholder="*Contact Email"
              name="contactEmail"
              value={contactEmail}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="tel"
              placeholder="*Contact Phone"
              name="contactPhone"
              value={contactPhone}
              onChange={onInputChange}
            />
          </div>

          <p className="mt-2 mb-1">Address:</p>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Street"
              name="street"
              value={street}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*City"
              name="city"
              value={city}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*State"
              name="state"
              value={state}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Zipcode"
              name="zipcode"
              value={zipcode}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="*Country"
              name="country"
              value={country}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-1">
            <p className="mt-2 mb-1">*Write about your organization below</p>
            <textarea
              name="about"
              value={about}
              onChange={onInputChange}
              rows="8"
              cols="20"
            />
          </div>
          <div className="mb-1">
            <p className="mt-2 mb-1">
              Aims or Objectives of your organization. Enter them seperated by a
              comma !
            </p>
            <textarea
              name="aim"
              value={aim}
              onChange={onInputChange}
              rows="8"
              cols="20"
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

CreateOrganizerProfile.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
};

export default connect(null, { createProfileAction })(CreateOrganizerProfile);
