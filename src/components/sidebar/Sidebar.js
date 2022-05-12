import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './sidebar.styles.scss';
function Sidebar({ auth: { user, isAuthenticated } }) {
  const attendeeLink = (
    <ul>
      <li>
        <Link to='/attendee-dashboard'>Main</Link>
      </li>
      <li>
        <Link to='#'>My conferences</Link>
      </li>
      <li>
        <Link to='#'>Claim CME credits</Link>
      </li>
      <li>
        <Link to='#'>Track CME credits</Link>
      </li>
      <li>
        <Link to='/attendee-dashboard/profile'>My profile</Link>
      </li>
      <li>
        <Link to='#'>Settings</Link>
      </li>
    </ul>
  );
  const organizerLinks = (
    <ul>
      <li>
        <Link to='/organizer-dashboard'>Main</Link>
      </li>
      <li>
        <Link to='#'>My conferences</Link>
      </li>
      <li>
        <Link to='/organizer-dashboard/create-conference'>
          Create conference
        </Link>
      </li>
      <li>
        <Link to='#'>Speakers</Link>
      </li>
      <li>
        <Link to='/organizer-dashboard/profile'>My profile</Link>
      </li>
      <li>
        <Link to='#'>Settings</Link>
      </li>
    </ul>
  );

  return (
    <aside className='side-menu'>
      {isAuthenticated && (
        <Fragment>
          {user && user.accountType === 'organizer'
            ? organizerLinks
            : attendeeLink}
        </Fragment>
      )}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);

// import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import './sidebar.styles.scss';
// function Sidebar() {
//   return (
//     <Fragment>
//       <aside className='side-menu'>
//         <ul>
//           <li>
//             <Link to='/dashboard'>Main</Link>
//           </li>
//           <li>
//             <Link to='#'>My conferences</Link>
//           </li>
//           <li>
//             <Link to='#'>Claim CME credits</Link>
//           </li>
//           <li>
//             <Link to='#'>Track CME credits</Link>
//           </li>
//           <li>
//             <Link to='/dashboard/profile'>My profile</Link>
//           </li>
//           <li>
//             <Link to='#'>Settings</Link>
//           </li>
//         </ul>
//       </aside>
//     </Fragment>
//   );
// }

// export default Sidebar;
