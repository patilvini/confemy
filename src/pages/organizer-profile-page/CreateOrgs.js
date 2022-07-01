import { connect } from 'react-redux';
import React, { useEffect, Fragment } from 'react';
import CreateOrganization from '../../components/organizer-profile/CreateOrganization';


const CreateOrgs = () => {
    
    return (
      <Fragment>
        <CreateOrganization/>
      </Fragment>
    );
  };
  export default connect()(CreateOrgs);