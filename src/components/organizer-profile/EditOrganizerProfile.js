import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProfileAction } from "../../redux/profile/profileAction";
import PropTypes from "prop-types";

function EditOrganizerProfile({
  profile: { isLoading, profile },
  createProfileAction,
}) {
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

  useEffect(() => {
    setFormData({
      about: isLoading || !profile.about ? "" : profile.about,
      aim: isLoading || !profile.aim ? "" : profile.aim,
      contactName: isLoading || !profile.contactName ? "" : profile.contactName,
      contactEmail:
        isLoading || !profile.contactEmail ? "" : profile.contactEmail,
      contactPhone:
        isLoading || !profile.contactPhone ? "" : profile.contactPhone,
      street:
        isLoading || !profile.location.street ? "" : profile.location.street,
      city: isLoading || !profile.location.city ? "" : profile.location.city,
      state: isLoading || !profile.location.state ? "" : profile.location.state,
      zipcode:
        isLoading || !profile.location.zipcode ? "" : profile.location.zipcode,
      country:
        isLoading || !profile.location.country ? "" : profile.location.country,
    });
  }, [isLoading]);

  const {
    about,
    contactName,
    contactEmail,
    contactPhone,
    aim,
    street,
    state,
    city,
    zipcode,
    country,
  } = formData;
  const navigate = useNavigate();
  const onInputChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const onFormSubmit = (event) => {
    let organizer = true;
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
              <td>Contact Name:</td>
              <td>
                <input
                  type="text"
                  placeholder="*Contact Name"
                  name="contactName"
                  value={contactName}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Contact Email:</td>
              <td>
                <input
                  type="text"
                  placeholder="*Contact Email"
                  name="contactEmail"
                  value={contactEmail}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Contact Phone:</td>
              <td>
                <input
                  type="text"
                  placeholder="Contact Phone"
                  name="contactPhone"
                  value={contactPhone}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>
                <span>
                  <input
                    type="text"
                    placeholder="*Street"
                    name="street"
                    value={street}
                    onChange={onInputChange}
                  />
                </span>
                <br />
                <span>
                  <input
                    type="text"
                    placeholder="*City"
                    name="city"
                    value={city}
                    onChange={onInputChange}
                  />
                </span>

                <span>
                  <input
                    type="text"
                    placeholder="*State"
                    name="state"
                    value={state}
                    onChange={onInputChange}
                  />
                </span>
                <br />
                <span>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={country}
                    onChange={onInputChange}
                  />
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="*Zipcode"
                    name="zipcode"
                    value={zipcode}
                    onChange={onInputChange}
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Objectives:</td>
              <td>
                <textarea
                  name="aim"
                  value={aim}
                  onChange={onInputChange}
                  rows="5"
                  cols="35"
                />
              </td>
            </tr>
            <tr>
              <td>About:</td>
              <td>
                <textarea
                  name="about"
                  value={about}
                  onChange={onInputChange}
                  rows="15"
                  cols="35"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="edit-profile mt-2">
          <button className="button button-primary">Submit Profile</button>{" "}
          <Link to="/organizer-dashboard/profile">
            <button className="button button-border-primary ">Go Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

EditOrganizerProfile.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfileAction,
})(EditOrganizerProfile);
