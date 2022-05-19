import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/auth/authAction";
import ExploreIcon from "../icons/ExploreIcon";
import ODashboardIcon from "../icons/ODashboardIcon";
import ProfileIcon from "../icons/ProfileIcon";
import PassesIcon from "../icons/PassesIcon";
import LikeBlueIcon from "../icons/LikeBlueIcon";
import HelpIcon from "../icons/HelpIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import DropdownIcon from "../icons/DropdownIcon";

import "./AuthDropdown.styles.scss";
import api from "../../utility/api";

const authDropdownOptions = [
  {
    icon: <ExploreIcon className="icon-size" />,
    name: "Browse Conference",
    path: "#!",
  },
  {
    icon: <ODashboardIcon className="icon-size" />,
    name: "Organize a Conference",
    path: "#!",
  },
  {
    icon: <ProfileIcon className="icon-size" />,
    name: "Profile",
    path: "#!",
  },
  {
    icon: <PassesIcon className="icon-size" />,
    name: "Tickets",
    path: "#!",
  },
  {
    icon: <LikeBlueIcon className="icon-size" />,
    name: "Saved Conference",
    path: "#!",
  },
  {
    icon: <HelpIcon className="icon-size" />,
    name: "Help",
    path: "#!",
  },
  {
    icon: <SettingsIcon className="icon-size" />,
    name: "Account Settings",
    path: "#!",
  },
];

export default function AuthDropdown() {
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

  const capitalize = (word) => {
    return word[0]?.toUpperCase() + word.slice(1).toLowerCase();
  };

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

  const dropdown = (
    <div className={openAuthDropdown ? "" : "display-none"}>
      <div className="auth-dropdown">
        <ul>
          <li>
            <ExploreIcon className="icon-size" />
            <span>Browse Conference</span>
          </li>
          <li>
            <ODashboardIcon className="icon-size" />
            <span>Organize a Conference</span>
          </li>
          <li>
            <ProfileIcon className="icon-size" />
            <span>Profile</span>
          </li>
          <li>
            <PassesIcon className="icon-size" />
            <span>Passes</span>
          </li>
          <li>
            <LikeBlueIcon className="icon-size" />
            <span>Saved Conference</span>
          </li>
          <li>
            <HelpIcon className="icon-size" />
            <span>Help</span>
          </li>
          <li>
            <SettingsIcon className="icon-size" />
            <span>Account Settings</span>
          </li>
          <li>
            <LogoutIcon className="icon-size" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      <div className="user-name-wrapper" onClick={onDropdownClick}>
        <span className="signin">{user && user?.firstName}</span>
        <DropdownIcon className="icon-size" />
      </div>
      <div className={openAuthDropdown ? "" : "display-none"}>
        <div className="auth-dropdown">
          <ul>
            {authDropdownOptions.map((e) => (
              <li key={e.name} onClick={() => navigate(e.path)}>
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
