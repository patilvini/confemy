import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './noProfile.styles.scss';

function NoProfile({ user }) {
  return (
    <div className='no-profile'>
      <p className='my-2'>You have not set up your profile</p>
      <Link
        to={
          user && user.accountType === 'organizer'
            ? `/organizer-dashboard/create-organizer-profile`
            : `attendee-dashboard/create-attendee-profile`
        }
      >
        <button className='button button-primary'>Add profile</button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(NoProfile);

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './noProfile.styles.scss';

// function NoProfile() {
//   return (
//     <div className='no-profile'>
//       <p className='my-2'>You have not set up your profile</p>
//       <Link to='/dashboard/create-attendee-profile'>
//         <button className='button button-primary'>Add profile</button>
//       </Link>
//     </div>
//   );
// }

// export default NoProfile;
