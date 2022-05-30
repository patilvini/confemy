import { useState } from "react";
import LocationIcon from "../icons/LocationIcon";
import SearchIcon from "../icons/SearchIcon";
import LogoDark from "../icons/LogoDark";
import AuthDropdown from "../auth-dropdown/AuthDropdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Dialogue from "../dialogue/Dialogue";

import "./navbar.styles.scss";

const Navbar = ({ auth: { isAuthenticated, isLoading } }) => {
  const [open, setopen] = useState(false);
  const openDialogue = () => {
    setopen(true);
  };
  const closeDialogue = () => {
    setopen(false);
  };

  const authLinks = <AuthDropdown />;

  const guestLinks = (
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
  );

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
          {/* <Link className="create-conference" to="/create-conference">
            Create Conference
          </Link> */}
          <span onClick={openDialogue} className="create-conference">
            Create Conference
          </span>
        </div>
        {!isLoading && <>{isAuthenticated ? authLinks : guestLinks} </>}
        <div>
          <Link className="location" to="#!">
            <LocationIcon className="nav-location-icon" />
            <span className="location-text">Location</span>
          </Link>
        </div>
        {open && (
          <Dialogue openDialogue={openDialogue} closeDialogue={closeDialogue} />
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Navbar);
