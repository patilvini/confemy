import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { sidemenuOptions } from "./OrganizersNavbarUtil";
import { hasChildren } from "./OrganizersNavbarUtil";

import DropdownIcon from "../icons/DropdownIcon";
import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon"

import "./organizersNavbar.styles.scss";

// active sidebar menu color

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function OrganizersNavbar({className, closeDash}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [dashOpen, setDashOpen] = useState(false)

  return (
    <div className={className}>
      <div className="organizers-dashboard">
        <h2
          onClick={() => {
            navigate("/dashboard");
          }}
          className="ml-16 mb-30"
        >
          Organizer's Dashboard
        </h2>
        <ul>
          {sidemenuOptions.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}
        </ul>
      </div>
      <div onClick={()=>closeDash()} className="close-org-dash">
        <i><CloseIcon fill="#444444" className="icon-size mr-10"/> </i><p>Close</p>
      </div>
    </div>
  );
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.pathname);
  // console.log(item.path);
  return (
    <li
      onClick={() => {
        navigate(item.path);
      }}
      className={location.pathname == item.path ? "active-sidenav-item" : null}
    >
      <i>{item.icon}</i>
      <span>{item.text}</span>
    </li>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);
  // const location = useLocation();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <li
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i>{item.icon}</i>
        <span>{item.text}</span>
        {open ? (
          <DropdownIcon className="icon-size" />
        ) : (
          <NextIcon className="icon-size" />
        )}
      </li>
      <div className={open ? null : "display-none"}>
        <ul style={{ paddingLeft: "16px" }}>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </ul>


        
      </div>
    </>
  );
};
