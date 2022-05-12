import { Outlet } from "react-router-dom";

export default function CreateConfLayoutPage() {
  return (
    <div className="container" style={{ display: "flex" }}>
      <div style={{ width: 200, height: "100vh", backgroundColor: "#757575" }}>
        Drawer Options
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
