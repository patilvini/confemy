import React, { Fragment } from "react";
import { connect } from "react-redux";
import AddManager from "../organizer-profile-page/AddManager";

const OrganizerDashboardPage = () => {
  return (
    <Fragment>
      <AddManager />
    </Fragment>
  );
};
export default connect()(OrganizerDashboardPage);
