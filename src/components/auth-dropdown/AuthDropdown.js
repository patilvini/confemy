import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/auth/authAction";
import ExploreIcon from "../icons/ExploreIcon";
import ODashboardIcon from "../icons/ODashboardIcon";
import ProfileIcon from "../icons/ProfileIcon";
import PassesIcon from "../icons/PassesIcon";
import LikeBlueIcon from "../icons/LikeBlueIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import DropdownIcon from "../icons/DropdownIcon";

import "./AuthDropdown.styles.scss";
import api from "../../utility/api";

const authDropdownOptions = [
  {
    icon: <ExploreIcon className="icon-size" />,
    name: "Browse Conferences",
    path: "search-conference",
  },
  {
    icon: <ODashboardIcon className="icon-size" />,
    name: "Organizer's Dashboard",
    path: "dashboard",
  },
  {
    icon: <ProfileIcon className="icon-size" />,
    name: "Profile",
    path: "/user-profile/account-settings",
  },
  {
    icon: <PassesIcon className="icon-size" />,
    name: "Tickets",
    path: "/user-profile/tickets",
  },
  {
    icon: <LikeBlueIcon className="icon-size" />,
    name: "Saved Conference",
    path: "/user-profile/saved-conference",
  },
  // {
  //   icon: <HelpIcon className="icon-size" />,
  //   name: "Help",
  //   path: "#!",
  // },
  {
    icon: <SettingsIcon className="icon-size" />,
    name: "Credits",
    path: "/user-profile/credits",
  },
  {
    icon: <SettingsIcon className="icon-size" />,
    name: "Account Settings",
    path: "/user-profile/account-settings",
  },
];

export default function AuthDropdown({ className }) {
  const [openAuthDropdown, setOpenAuthDropdown] = useState(false);
  const onDropdownClick = () => setOpenAuthDropdown(!openAuthDropdown);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = auth;

  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpenAuthDropdown(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const onLogoutClick = async () => {
    try {
      const response = await api.get("/logout");
      if (response) {
        setOpenAuthDropdown(false);
        dispatch(logoutAction());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div ref={ref}>
      <div
        className="user-name-wrapper mr-15 mt-6"
        onClick={onDropdownClick}
        // onMouseEnter={() => setOpenAuthDropdown(true)}
        // onMouseLeave={() => setOpenAuthDropdown(false)}
      >
        <span className="signin">{user && user?.firstName}</span>
        <DropdownIcon className="icon-size" />
      </div>
      <div
        className={openAuthDropdown ? "" : "display-none"}
        // onMouseEnter={() => setOpenAuthDropdown(true)}
        // onMouseLeave={() => setOpenAuthDropdown(false)}
      >
        <div className={className}>
          <ul>
            {authDropdownOptions.map((e) => (
              <li
                key={e.name}
                onClick={() => {
                  navigate(e.path);
                  setOpenAuthDropdown(false);
                }}
              >
                {e.icon}
                <div className="avenir-roman-18">{e.name}</div>
              </li>
            ))}
            <li onClick={onLogoutClick}>
              <LogoutIcon className="icon-size" />
              <div className="avenir-roman-18">Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
