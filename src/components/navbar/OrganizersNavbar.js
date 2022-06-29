import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  drawerWidth,
  drawerBackground,
  drawerTextColor,
  drawerActiveListBackgroundColor,
} from "./OrganizersNavbarUtils";

import { sidemenuOptions } from "./OrganizersNavbarUtils";
import { hasChildren } from "./OrganizersNavbarUtils";

// active sidebar menu color

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function OrganizersNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <>
      <div
        style={{
          width: drawerWidth,
          flexShrink: 0,
          //   backgroundColor: drawerBackground,
          color: drawerTextColor,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: '',
            // backgroundColor: 'rgba(255, 255, 255, 0.04)',
            minHeight: 90,
            margin: 2,
            padding: 2,
            borderRadius: 1,
          }}
        >
          <div>Khanderao</div>
        </div>

        {/** Drawer menu list goes here. See  */}

        <ul
          style={{
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          {sidemenuOptions.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <li
      onClick={() => {
        navigate(item.path);
      }}
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
    console.log("cliked");
    setOpen((prev) => !prev);
  };

  return (
    <>
      <li onClick={handleClick}>
        <i>{item.icon}</i>
        <span>{item.text}</span>
        {open ? <span>C</span> : <span>O</span>}
      </li>
      <div>
        <ul>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </ul>
      </div>
    </>
  );
};
