import { NavLink, Outlet } from "react-router-dom";

export default function TabsDemo2() {
  return (
    <div className="mb-24">
      <h2 className="mb-30">Tabs Demo 2</h2>
      <div className="flex-vc mx-8 body-bold mb-40 ">
        <NavLink to="page1">
          {({ isActive }) => (
            <button
              className={
                isActive
                  ? "button button-primary mr-8"
                  : "button-outlined button-outlined-primary mr-8 "
              }
            >
              Tab1
            </button>
          )}
        </NavLink>
        <NavLink to="page2">
          {({ isActive }) => (
            <button
              className={
                isActive
                  ? "button button-primary mr-8"
                  : "button-outlined button-outlined-primary mr-8 "
              }
            >
              Tab2
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
