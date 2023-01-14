import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Passes from "../../components/user-profile/Passes";
import SavedConfs from "../../components/user-profile/SavedConfs";
import Credits from "../../components/user-profile/Credits";
import AccountSettings from "../../components/user-settings/AccountSettings";

import "./userProfileLayout.scss";

export default function Tabs() {
  const DEFAULT_ACTIVE_TAB = "tickets";
  const tabs = {
    tickets: {
      title: "Tickets",
      content: <Passes />,
    },
    saved_conferences: {
      title: "Saved Conferences",
      content: <SavedConfs />,
    },
    credits: {
      title: "Credits",
      content: <Credits />,
    },
    account_settings: {
      title: "Account Settings",
      content: <AccountSettings />,
    },
  };

  const { active_tab } = useParams();
  const navigate = useNavigate();

  const toggle = (tab) => {
    if (active_tab !== tab) {
      navigate(`/user-profile/${tab}`);
    }
  };

  useEffect(() => {
    if (!active_tab) {
      navigate(`/user-profile/${DEFAULT_ACTIVE_TAB}`);
    }
  }, []);

  return (
    <div>
      <div className="flex mb-40">
        {Object.entries(tabs).map((tab) => (
          <div key={tab[0]} className="demo-tabs">
            <div
              className={active_tab === tab[0] ? "active-tab mr-40" : "mr-40"}
              onClick={() => {
                toggle(tab[0]);
              }}
            >
              {tab[1].title}
            </div>
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
  );
}
