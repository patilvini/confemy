import { Outlet } from "react-router-dom";
import OrganizersNavbar from "../../components/navbar/OrganizersNavbar";

export default function DashboardLayoutPage() {
  return (
    <div className="container" style={{ display: "flex" }}>
      <OrganizersNavbar />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
