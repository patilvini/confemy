import {
  useNavigate,
  // useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";

// import RadioIcon from "../icons/RadioIcon";
// import RadioFilledIcon from "../icons/RadioFilled";
import "./confSteps.styles.scss";
// import RadioCompletedIcon from "../icons/RadioCompletedIcon";
import Tabs from "../tabs/Tabs";

export default function ConfSteps() {
  const navigate = useNavigate();
  // const location = useLocation();
  const newConference = useSelector((state) => state.conference?.newConference);

  const steps = [
    {
      label: "Basic Info",
      path: "/dashboard/create-conf/step-1",
      completed: newConference?.completedStep1,
    },
    {
      label: "Details 1",
      path: "/dashboard/create-conf/step-2",
      completed: newConference?.completedStep2,
    },
    {
      label: "Details 2",
      path: "/dashboard/create-conf/step-3",
      completed: newConference?.completedStep3,
    },
    {
      label: "Live Stream",
      path: "/dashboard/create-conf/step-4",
      completed: newConference?.completedStep4,
    },
    {
      label: "Tickets",
      path: "/dashboard/create-conf/step-5",
      completed: newConference?.completedStep5,
    },
    {
      label: "Preview",
      path: "/dashboard/create-conf/step-6",
      completed: newConference?.completedStep6,
    },
  ];

  return (
    <div className="conf-steps-container">
      <h2>Create Conference Steps</h2>
      <Tabs tabs={steps} showRadioButtons={true} />
      {/* <ul className="conf-steps">
        {steps.map((step, indx) => (
          <li onClick={() => navigate(step.path)} key={step.label}>
            {step.completed ? (
              <RadioCompletedIcon />
            ) : location.pathname == step.path ? (
              <RadioFilledIcon className="icon-size" />
            ) : (
              <RadioIcon className="icon-size" />
            )}
            <div
              className={
                step.completed
                  ? "completed-conf-step"
                  : location.pathname == "/dashboard/create-conf/step-1"
                  ? "active-conf-step"
                  : "inactive-conf-step "
              }
            >
              {step.label}
            </div>
            <div className="steps-line"></div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
