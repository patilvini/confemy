import { useNavigate, useLocation } from "react-router-dom";
import RadioIcon from "../icons/RadioIcon";
import RadioFilledIcon from "../icons/RadioFilled";
import "./confSteps.styles.scss";

const steps = [
  { label: "Basic Info", path: "/create-conference" },
  { label: "Details", path: "/create-conference/details" },
  { label: "Live Stream", path: "/create-conference/live-stream" },
  { label: "Tickets", path: "/create-conference/tickets" },
  { label: "Preview and Publish", path: "/create-conference/preview-publish" },
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
