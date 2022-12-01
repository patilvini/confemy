import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import DashMenuIcon from "../../components/icons/DashMenuIcon";
import OrganizersNavbar from "../../components/navbar/OrganizersNavbar";
import "./dashLayout.scss";

export default function DashboardLayoutPage({ onClickOutside }) {
  const [dashOpen, setDashOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log(event.target)
      // console.log(ref)

      if (ref.current && !ref.current.contains(event.target)) {
        setDashOpen(false);
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div>
      <div className="sub-navbar-layout">
        <i
          style={{ zIndex: "0" }}
          className="org-dash-responsive-button"
          onClick={() => setDashOpen(!dashOpen)}
        >
          <DashMenuIcon className="icon-size" />
        </i>
      </div>
      <main
        className="container flex"
        // style={{
        //   display: "flex",
        //   // backgroundColor: "#fafbfc",
        // }}
      >
        {dashOpen && (
          <div ref={ref}>
            <OrganizersNavbar
              closeDash={() => setDashOpen(false)}
              className="sidemenu-container-small"
            />
          </div>
        )}
        <OrganizersNavbar className={"sidemenu-container"} />
        <div style={{ flexGrow: 1 }}>
          <div className="container-offSidemenu">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );

  // (
  //   <div
  //     className="container"
  //     style={{ display: "flex", backgroundColor: "#fafbfc" }}
  //   >
  //     <OrganizersNavbar />
  //     <div style={{ flexGrow: 1 }}>
  //       <div className="container-offSidemenu">
  //         <Outlet />
  //       </div>
  //     </div>
  //   </div>
  // );
}
