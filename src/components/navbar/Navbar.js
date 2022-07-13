import { useSelector } from "react-redux";
import LocationIcon from "../icons/LocationIcon";
import SearchIcon from "../icons/SearchIcon";
import LogoDark from "../icons/LogoDark";
import AuthDropdown from "../auth-dropdown/AuthDropdown";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.styles.scss";

export default function Navbar() {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  console.log("navbar loaded");

  return (
    <nav className="navbar">
      <div className="navbar-first-container">
        <div className="logo-container">
          <Link to="/">
            <LogoDark className="logo" />
          </Link>
        </div>
        <div className="search-box">
          <SearchIcon height="1.4rem" width="1.4rem" />
          <span className="explore-conferences">Explore Conferences</span>
        </div>
      </div>
      <div className="navbar-second-container">
        <div>
          <Link className="create-conference" to="dashboard/create-conference">
            Create Conference
          </Link>
        </div>
        {/* {!auth?.isLoading && (
          <> {auth?.isAuthenticated ? authLinks : guestLinks} </>
        )} */}
        {isAuthenticated && user ? (
          <>
            <AuthDropdown />
          </>
        ) : (
          <>
            <div>
              <Link to="/register" className="signin">
                Register
              </Link>
            </div>
            <div>
              <Link to="/signin" className="signin">
                Sign in
              </Link>
            </div>
          </>
        )}
        <div>
          <Link className="location" to="#!">
            <LocationIcon className="nav-location-icon" />
            <span className="location-text">Location</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

Navbar.protoType = {
  auth: PropTypes.object.isRequired,
};
