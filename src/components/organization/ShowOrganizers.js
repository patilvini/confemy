import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import api from "../../utility/api";
import CloseIcon from "../icons/CloseIcon";
import { loadOrganization } from "./organizationUtil";

import "./showOrganizers.styles.scss";

export default function ShowOrganizers({ organizers, organizationId }) {
  const user = useSelector((state) => state.auth.user);

  const removeOrganizer = async (orgnizerId) => {
    const url = `organizations/${organizationId}/organizers/${orgnizerId}/users/${user._id}`;
    console.log("url remove orgnizer", url);
    try {
      const response = await api.delete(url);
      if (response) loadOrganization(organizationId, user._id);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  return (
    <>
      {organizers &&
        organizers.map((org) => (
          <div className="show-organizers-grid">
            <div className="grid-1st-col">
              <p className="body-bold">
                {org?.user?.firstName} {org?.user?.lastName}{" "}
              </p>
              <div className="body-regular-gray3">{org?.user?.email}</div>
            </div>
            <div className="grid-2nd-col">
              {!org?.user?.userRegistered && (
                <span className="body-bold">Pending invite</span>
              )}
            </div>
            <div className="grid-3rd-col">
              {!org?.user?.userRegistered ? (
                <button
                  onClick={() => removeOrganizer(org._id)}
                  type="button"
                  className="social-delete-button"
                >
                  <CloseIcon className="icon-size" />
                </button>
              ) : (
                <button
                  onClick={() => removeOrganizer(org._id)}
                  type="button"
                  className="button button-primary"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

ShowOrganizers.propTypes = {
  organizers: PropTypes.array.isRequired,
  organizationId: PropTypes.string.isRequired,
};
