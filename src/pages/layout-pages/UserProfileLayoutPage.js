import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import './userProfileLayout.scss';

export default function UserProfileLayoutPage() {
  const user = useSelector((state) => state.auth?.user);

  const tabs = [
    { path: 'tickets', label: 'Tickets' },
    { path: 'saved-conference', label: 'Saved Conference' },
    { path: 'credits', label: 'Credits' },
    { path: 'account-settings', label: 'Account Settings' },
  ];

  return (
    <div className="container">
      <div className="up-tabs-wrap bg-white">
        <div className="text-align-center mb-68">
          <h1 className="mb-24">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="caption-2-regular-gray3">
            <p className="mb-6">{user?.email}</p>
            <p>{user?.profession}</p>
          </div>
        </div>
        <div className="user-profile-flex-vchc ">
          {tabs.map((tab) => (
            <NavLink key={tab.label} to={tab.path}>
              {({ isActive }) => (
                <div
                  className={`up-tab mx-16 caption-1-heavy-gray2 ${
                    isActive ? 'up-active-tab' : ' '
                  }`}
                >
                  {tab.label}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
