import React, {Fragment } from 'react';
import { connect } from 'react-redux';

import OrganizationDash from '../../components/organizer-profile/OrganizationDash';

const OrganizerDashboardPage = () => {
  
  return (
    <Fragment>
      <OrganizationDash/>
    </Fragment>
  );
};
export default connect()(OrganizerDashboardPage);
