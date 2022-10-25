import { useSelector } from "react-redux";
import LocationIcon from "../icons/LocationIcon";
import SearchIcon from "../icons/SearchIcon";
import LogoDark from "../icons/LogoDark";
import AuthDropdown from "../auth-dropdown/AuthDropdown";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.styles.scss";
import ShoppingCart from "../auth-dropdown/ShoppingCart";
import SettingsIcon from "../icons/SettingsIcon";
import HamburgerIcon from "../icons/HamburgerIcon";
import { useState } from "react";
import CloseMenu from "../icons/CloseMenu";

export default function PNavbar() {
  const [menu, setMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <div>
      <div className="navbar-responsive">
        <div className="navbar-left-item">
          <div className="logo-container">
            <Link to="/">
              <LogoDark className="logo" />
            </Link>
          </div>
          <div className="search-button-nav">
          <Link to="search-conference">
            <div className="search-box">
              <SearchIcon height="1.4rem" width="1.4rem" />
              <span className="explore-conferences">Explore Conferences</span>
            </div>
          </Link>

          </div>
          
        </div>
        <div className="navbar-right-item">
          <div className="mr-20">
            <Link
              className="create-conference"
              to="dashboard/create-conference"
            >
              Create Conference
            </Link>
          </div>
          {/* {!auth?.isLoading && (
          <> {auth?.isAuthenticated ? authLinks : guestLinks} </>
        )} */}
          <div className="flex-container">
            {isAuthenticated && user ? (
              <>
                <ShoppingCart />
                <AuthDropdown />
              </>
            ) : (
              <>
                <div className="mx-20">
                  <Link to="/register" className="signin mr-20">
                    Register
                  </Link>
                </div>
                <div>
                  <Link to="/signin" className="signin mr-20">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="location-flex">
            <Link className="location" to="#!">
              <LocationIcon className="nav-location-icon" />
              <span className="location-text">Location</span>s
            </Link>
          </div>
          <div className="hamburger-button">
            {!menu ? (
              <button onClick={() => setMenuOpen(true)}>
                <HamburgerIcon />
              </button>
            ) : (
              <button onClick={() => setMenuOpen(false)}>
                <CloseMenu />
              </button>
            )}
          </div>
        </div>
      </div>

      {menu && (
        <div className="nav-menu">

            
          
          <Link to="search-conference">
          <div className="nav-item">
           <SearchIcon height="1.4rem" width="1.4rem" />
              <span className="explore-conferences">Explore Conferences</span>
            
            </div>
          </Link>
          
          
          <div className="nav-item">
            <Link
              className="create-conference"
              to="dashboard/create-conference"
            >
              Create Conference
            </Link>
          </div>
          {/* {!auth?.isLoading && (
          <> {auth?.isAuthenticated ? authLinks : guestLinks} </>
        )} */}

          {isAuthenticated && user ? (
            <div>
              <div className="nav-item">
                <ShoppingCart />
              </div>
              <div className="nav-item">
                <AuthDropdown />
              </div>
            </div>
          ) : (
            <>
              <div className="nav-item">
                <Link to="/register" className="signin">
                  Register
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/signin" className="signin">
                  Sign in
                </Link>
              </div>
            </>
          )}

          <div  className="nav-item">
            <Link className="location-nav" to="#!">
              <LocationIcon className="nav-location-icon" />
              <span className="location-text">Location</span>
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
