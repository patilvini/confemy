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
      content: (
        <div>
          <Passes />
        </div>
      ),
    },
    savedConference: {
      title: "Saved Conference",
      content: (
        <div>
          <SavedConfs />
        </div>
      ),
    },
    credits: {
      title: "Credits",
      content: (
        <div>
          <Credits />
        </div>
      ),
    },
    accountSetting: {
      title: "Account Settings",
      content: (
        <div>
          <AccountSettings />
        </div>
      ),
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
      navigate(`/${tab}`);
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

        <nav tabs>
          {Object.entries(tabs).map((tab) => (
            <NavLink
              key={tab[0]}
              className={active_tab === tab[0] ? "active" : ""}
              onClick={() => {
                toggle(tab[0]);
              }}
              role="button"
            >
              <h4> {tab[1].title}</h4>
            </NavLink>
          ))}
        </nav>
        <TabContent tabs={tabs} />
      </div>
      <Outlet />
    </div>
  );
}

export default UserProfileLayoutPage;
