import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileAction } from "../../redux/profile/profileAction";
import Spinner from "../../components/spinner/Spinner";
import NoProfile from "../../components/no-profile/NoProfile";
import OrganizerProfile from "../../components/organizer-profile/OrganizerProfile";

const OrganizerProfilePage = ({
  getProfileAction,
  profile: { profile, isLoading },
  auth: { user },
}) => {
  useEffect(() => {
    let organizer = true;
    getProfileAction(organizer);
  }, [getProfileAction]);

  return (
    <Fragment>
      <div className="right-max-container">
        {isLoading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            {profile !== null ? <OrganizerProfile /> : <NoProfile />}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

OrganizerProfilePage.propType = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileAction })(
  OrganizerProfilePage
);
