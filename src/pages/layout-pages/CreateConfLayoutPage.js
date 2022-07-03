import { Outlet } from "react-router-dom";
import ConfSteps from "../../components/conference/ConfSteps";

export default function CreateConfLayoutPage() {
  return (
    <div className="container">
      <ConfSteps />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
