import { Outlet } from "react-router-dom";
import ConfSteps from "../../components/conference/ConfSteps";

export default function CreateConfLayoutPage() {
  return (
    <div className="container" style={{ display: "flex" }}>
      <ConfSteps />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
