import { Outlet } from "react-router-dom";
import OrganizersNavbar from "../../components/navbar/OrganizersNavbar";

export default function DashboardLayoutPage() {
  return (
    <main
      className="container"
      style={{ display: "flex", backgroundColor: "#fafbfc" }}
    >
      <OrganizersNavbar />
      <div style={{ flexGrow: 1 }}>
        <div className="container-offSidemenu">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
