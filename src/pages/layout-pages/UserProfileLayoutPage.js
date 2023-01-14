// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// import "./userProfileLayout.scss";

// const UserProfileLayoutPage = () => {
//   const user = useSelector((state) => state.auth?.user);

//   let activeStyle = {
//     textDecoration: "underline",
//   };

//   let activeClassName = "underline";

//   return (
//     <div className="profile-page-wrapper">
//       <div className="profile-name">
//         <h1 className="profile-name">
//           {user?.firstName} {user?.lastName}
//         </h1>
//         <span
//           style={{ marginBottom: "9.6rem" }}
//           className="caption-2-regular-gray3"
//         >
//           {user?.email}, {user?.profession}
//         </span>
//         <div className="link-profile">
//           <nav>
//             <NavLink
//               className="link-text"
//               to="passes"
//               style={({ isActive }) => (isActive ? activeStyle : undefined)}
//             >
//               Passes
//             </NavLink>
//             <NavLink
//               className="link-text"
//               to="saved-conference"
//               style={({ isActive }) => (isActive ? activeStyle : undefined)}
//             >
//               Saved Conference
//             </NavLink>
//             <NavLink
//               className="link-text"
//               to="credits"
//               style={({ isActive }) => (isActive ? activeStyle : undefined)}
//             >
//               Credits
//             </NavLink>
//             <NavLink
//               className="link-text"
//               to="account-settings"
//               style={({ isActive }) => (isActive ? activeStyle : undefined)}
//             >
//               Account Settings
//             </NavLink>
//           </nav>

//         </div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default UserProfileLayoutPage;

import React, { useEffect } from "react";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Passes from "../../components/user-profile/Passes";
import TabContent from "./TabContent";
import SavedConfs from "../../components/user-profile/SavedConfs";
import Credits from "../../components/user-profile/Credits";
import AccountSettings from "../../components/user-settings/AccountSettings";

function UserProfileLayoutPage() {
  const user = useSelector((state) => state.auth?.user);
  const DEFAULT_ACTIVE_TAB = "passes";
  const tabs = {
    passes: {
      title: "Passes",
      content: <Passes />,
    },
    savedConference: {
      title: "Saved Conference",
      content: <SavedConfs />,
    },
    credits: {
      title: "Credits",
      content: <Credits />,
    },
    accountSetting: {
      title: "Account Settings",
      content: <AccountSettings />,
    },
  };

  const { active_tab } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active_tab) {
      navigate(`/${DEFAULT_ACTIVE_TAB}`);
    }
  }, []);

  const toggle = (tab) => {
    if (active_tab !== tab) {
      navigate(`/user-profile/${tab}`);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-name">
        <h1 className="profile-name">
          {user?.firstName} {user?.lastName}
        </h1>
        <span
          style={{ marginBottom: "9.6rem" }}
          className="caption-2-regular-gray3"
        >
          {user?.email}, {user?.profession}
        </span>

        <div className="flex-vchc my-40">
          {Object.entries(tabs).map((tab) => (
            <div
              key={tab[0]}
              className={active_tab === tab[0] ? "active-tab mx-8" : "mx-8"}
              onClick={() => {
                toggle(tab[0]);
              }}
            >
              <h4> {tab[1].title}</h4>
            </div>
          ))}
        </div>
        <div>
          {Object.entries(tabs).map((tab) =>
            active_tab === tab[0] ? (
              <div key={tab[0]}>{tab[1].content}</div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileLayoutPage;
