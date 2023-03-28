import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import RadioCompletedIcon from "../icons/RadioCompletedIcon";
import RadioIcon from "../icons/RadioIcon";
import RadioFilledIcon from "../icons/RadioFilled";

import "./tabs.styles.scss";

export default function Tabs({ tabs, showRadioButtons }) {
  return (
    <div className="tabs-flex">
      {tabs.map((tab) => (
        <div>
          <NavLink key={tab.label} to={tab.path}>
            {({ isActive }) => (
              <>
                {showRadioButtons && (
                  <div className="text-align-center mr-36">
                    {tab.completed ? (
                      <RadioCompletedIcon className="icon-size" />
                    ) : isActive ? (
                      <RadioFilledIcon className="icon-size" />
                    ) : (
                      <RadioIcon className="icon-size" />
                    )}
                  </div>
                )}
                <div
                  className={`inactive-shared-tab mr-32 mt-8 ${
                    tab.completed
                      ? isActive
                        ? "completed-active-shared-tab"
                        : "completed-inactive-shared-tab"
                      : isActive
                      ? "active-shared-tab"
                      : ""
                  }`}
                >
                  {tab.label}
                </div>
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  showRadioButtons: PropTypes.bool.isRequired,
};
