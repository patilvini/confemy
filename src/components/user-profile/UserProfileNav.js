import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./profilepage.scss";
import Passes from "./Passes";
import SavedConfs from "./SavedConfs";
import Credits from "./Credits";
import AccountSettings from "../user-settings/AccountSettings";

export default function UserProfileNav() {
  const user = useSelector((state) => state.auth?.user);
  const [component, setComponent] = useState(<Passes />);
  // const [activeTab, setActiveTab] = useState("passes");

  // const toggle = (tab) => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // };

  // const tabs = {
  //   passes: {
  //     title: "Passes",
  //     content: (
  //       <button
  //         onClick={() => setComponent(<Passes />)}
  //         className="button-text"
  //       >
  //         Passes
  //       </button>
  //     ),
  //   },
  //   savedConference: {
  //     title: "Saved Conference",
  //     content: (
  //       <button
  //         onClick={() => setComponent(<SavedConfs />)}
  //         className="button-text"
  //       >
  //         Saved Conference
  //       </button>
  //     ),
  //   },
  //   credits: {
  //     title: "Credits",
  //     content: (
  //       <button
  //         onClick={() => setComponent(<Credits />)}
  //         className="button-text"
  //       >
  //         Credits
  //       </button>
  //     ),
  //   },
  //   accountSettings: {
  //     title: "Account Settings",
  //     content: (
  //       <button
  //         onClick={() => setComponent(<AccountSettings />)}
  //         className="button-text"
  //       >
  //         Account Settings
  //       </button>
  //     ),
  //   },
  // };

  return (
    <div>
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

          <div className="buttons-profile">
            <button
              onClick={() => setComponent(<Passes />)}
              className="button-text"
            >
              Passes
            </button>
            <button
              onClick={() => setComponent(<SavedConfs />)}
              className="button-text"
            >
              Saved Conference
            </button>
            <button
              onClick={() => setComponent(<Credits />)}
              className="button-text"
            >
              Credits
            </button>
            <button
              onClick={() => setComponent(<AccountSettings id={user._id} />)}
              className="button-text"
            >
              Account Settings
            </button>
            {/* {Object.entries(tabs).map((tab) => (
              <NavLink key={tab[0]}>
                <Link
                  className={activeTab === tab[0] ? "active" : ""}
                  onClick={() => {
                    toggle(tab[0]);
                  }}
                  role="button"
                >
                  {tab[1].title}
                </Link>
              </NavLink>
            ))} */}
          </div>
        </div>
      </div>
      {component}
    </div>
  );
}
