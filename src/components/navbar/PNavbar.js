import { useSelector } from "react-redux";
import LocationIcon from "../icons/LocationIcon";
import SearchIcon from "../icons/SearchIcon";
import LogoDark from "../icons/LogoDark";
import AuthDropdown from "../auth-dropdown/AuthDropdown";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import HamburgerIcon from "../icons/HamburgerIcon";
import { useEffect, useRef, useState } from "react";
import CloseMenu from "../icons/CloseMenu";
import LocationDropdown from "../location-dropdown/LocationDropdown";

export default function PNavbar({ onClickOutside }) {
  const [menu, setMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const [showLocations, setShowLocations] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuOpen(false);
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  // useEffect(()=>{
  //   setMenuOpen(false)
  // },[])

  return (
    <div className="navbar-container ">
      <div className="navbar-responsive position-relative">
        <div className="navbar-left-item">
          <div className="logo-container">
            <Link to="/">
              <LogoDark className="logo" />
            </Link>
          </div>
          <div className="search-button-nav">
            <Link to="search-conference">
              <div className="search-box">
                <span className="explore-conferences">Explore Conferences</span>
              </div>
            </Link>
          </div>
        </div>
        <div>
          {isAuthenticated && user ? (
            <div className="navbar-mid-item">
              <Link
                className="create-conference mt-6 mr-30"
                to="dashboard/create-conference"
              >
                Create Conference
              </Link>
              <AuthDropdown className={"auth-dropdown"} />
            </div>
          ) : (
            <div className="navbar-mid-item">
              <div>
                <Link
                  className="create-conference mr-30"
                  to="dashboard/create-conference"
                >
                  Create Conference
                </Link>
              </div>

              <div>
                <Link to="/register" className="signin mr-30">
                  Register
                </Link>
              </div>
              <div>
                <Link to="/signin" className="signin">
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="navbar-right-item">
          <div className="auth-cart">
            {isAuthenticated && user ? (
              <div className="flex">
                <AuthDropdown className={"auth-dropdown-small"} />
              </div>
            ) : (
              <div className="flex-vc mr-20 mt-6">
                <div>
                  <Link to="/register" className="signin mr-30">
                    Register
                  </Link>
                </div>
                <div>
                  <Link to="/signin" className="signin">
                    Sign in
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="location-flex">
            <div
              className="location"
              onClick={() => setShowLocations((prev) => !prev)}
            >
              {/* <LocationIcon className="nav-location-icon" />
              <span className="location-text">Location</span>s */}
              <LocationDropdown />
            </div>
          </div>
          <div className="hamburger-button">
            {!menu ? (
              <i onClick={() => setMenuOpen(true)}>
                <HamburgerIcon />
              </i>
            ) : (
              <button onClick={() => setMenuOpen(false)}>
                <CloseMenu />
              </button>
            )}
          </div>
        </div>

        {menu && (
          <div ref={ref} className="nav-menu">
            <Link
              onClick={() => {
                setMenuOpen(false);
              }}
              to="search-conference"
            >
              <div className="nav-item">
                <div className="flex-vc">
                  <p className="explore-conferences-drop">
                    Explore Conferences
                  </p>
                  <SearchIcon height="1.4rem" width="1.4rem" />
                </div>
              </div>
            </Link>

            <div className="nav-item">
              <Link
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="create-conference"
                to="dashboard/create-conference"
              >
                Create Conference
              </Link>
            </div>
            <div className="nav-item">
              <Link className="location-nav" to="#!">
                <div className="flex-vc">
                  <p className="location-text-drop">Location</p>
                  <LocationIcon className="nav-location-icon" />
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
