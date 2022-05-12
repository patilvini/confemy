import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
const AttendeeDashboardPage = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Sidebar />
      <div className='right-max-container'>Attendee Dashboard Page </div>
    </Fragment>
  );
};
export default connect()(AttendeeDashboardPage);
