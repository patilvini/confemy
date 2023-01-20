import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import api from "../../utility/api";
import CloseIcon from "../icons/CloseIcon";
import { loadOrganizationAction } from "../../redux/organization/organizationAction";

import "./showOrganizers.styles.scss";

export default function ShowOrganizers({ organizers, organizationId }) {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const removeOrganizer = async (orgnizerId) => {
    const url = `organizations/${organizationId}/organizers/${orgnizerId}/users/${user._id}`;

    try {
      const response = await api.delete(url);
      // if (response) loadOrganization(organizationId, user._id);
      if (response)
        dispatch(loadOrganizationAction(response.data.data.organization));
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  return (
    <>
      {organizers &&
        organizers.map((org) => (
          <div key={org._id} className="show-organizers-grid">
            <div className="grid-1st-col">
              <p className="body-bold">
                {org?.user?.firstName} {org?.user?.lastName}
              </p>
              <div className="body-regular-gray3">{org?.user?.email}</div>
            </div>
            <div className="grid-2nd-col">
              {!org?.user?.userRegistered && (
                <span className="body-bold">Pending invite</span>
              )}
            </div>
            <div className="grid-3rd-col">
              {org?.isAdmin ? (
                <button className="button button-primary">Admin</button>
              ) : org?.active ? (
                <button
                  onClick={() => removeOrganizer(org._id)}
                  type="button"
                  className="button button-primary"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => removeOrganizer(org._id)}
                  type="button"
                  className="social-delete-button"
                >
                  <CloseIcon className="icon-size" />
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
