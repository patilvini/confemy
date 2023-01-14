import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./userProfileLayout.scss";

export default function UserProfileNav() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div>
      <div className="">
        <h1 className=" flex-vchc mt-88">
          {user?.firstName} {user?.lastName}
        </h1>
        <span
          style={{ marginBottom: "9.6rem" }}
          className="caption-2-regular-gray3  flex-vchc"
        >
          {user?.email}, {user?.profession}
        </span>
      </div>
      <div className="flex-vchc">
        <NavLink to="tickets">
          {({ isActive }) => (
            <button className={isActive ? "active" : "in-active"}>
              Passes
            </button>
          )}
        </NavLink>
        <NavLink to="saved-conference">
          {({ isActive }) => (
            <button className={isActive ? "active" : "in-active"}>
              Saved Conference
            </button>
          )}
        </NavLink>
        <NavLink to="credits">
          {({ isActive }) => (
            <button className={isActive ? "active" : "in-active"}>
              Credits
            </button>
          )}
        </NavLink>
        <NavLink to="account-settings">
          {({ isActive }) => (
            <button className={isActive ? "active" : "in-active"}>
              Account Settings
            </button>
          )}
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
