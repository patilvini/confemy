import { useNavigate, useLocation } from "react-router-dom";
import RadioIcon from "../icons/RadioIcon";
import RadioFilledIcon from "../icons/RadioFilled";
import "./confSteps.styles.scss";

const steps = [
  { label: "Basic Info", path: "/dashboard/create-conference" },
  { label: "Details 1", path: "/dashboard/create-conference/details-1" },
  { label: "Details 2", path: "/dashboard/create-conference/details-2" },
  { label: "Live Stream", path: "/dashboard/create-conference/live-stream" },
  { label: "Tickets", path: "/dashboard/create-conference/tickets" },
  { label: "Preview and Publish", path: "/dashboard/create-conference/preview-publish" },
];

export default function ConfSteps() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ul className="conf-steps">
      {steps.map((step) => (
        <li onClick={() => navigate(step.path)} key={step.label}>
          {location.pathname == step.path ? (
            <RadioFilledIcon className="icon-size" />
          ) : (
            <RadioIcon className="icon-size" />
          )}
          <div
            className={
              location.pathname == step.path
                ? "active-conf-step"
                : "inactive-conf-step "
            }
          >
            {step.label}
          </div>
        </li>
      ))}
    </ul>
  );
}
