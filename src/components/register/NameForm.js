import React, { useState, Fragment } from "react";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import TextInput from "../formik/TextInput";
import SelectOne from "../formik/SelectOne";
import DropdownIcon from "../icons/DropdownIcon";
import { professions } from "../../utility/commonUtil";

function NameForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Fragment>
      <div className="grid-col-2">
        <div className="input-container">
          <TextInput name="firstName" type="text" placeholder="First Name" />
        </div>
        <div className="input-container">
          <TextInput name="lastName" type="text" placeholder="Last Name" />
        </div>
      </div>
      <div className="input-container position-relative">
        <SelectOne name="profession">
          <option value="">Select a Profession</option>
          {professions.map((profession) => (
            <option key={profession.value} value={profession.value}>
              {profession.label}
            </option>
          ))}
        </SelectOne>
        <DropdownIcon className=" right-input-icon icon-lg" />
      </div>

      <div>
        <div className="position-relative input-container">
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
          />
          <i
            onClick={togglePassword}
            className={showPassword ? "display-none" : "right-input-icon"}
          >
            <ClosedEyeIcon className="icon-lg" />
          </i>

          <i
            onClick={togglePassword}
            className={showPassword ? "right-input-icon" : "display-none"}
          >
            <OpenEyeIcon className="icon-lg" />
          </i>
        </div>

        <div className="position-relative input-container">
          <TextInput
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <i
            onClick={toggleConfirmPassword}
            className={
              showConfirmPassword ? "display-none" : "right-input-icon"
            }
          >
            <ClosedEyeIcon className="icon-lg" />
          </i>

          <i
            onClick={toggleConfirmPassword}
            className={
              showConfirmPassword ? "right-input-icon" : "display-none"
            }
          >
            <OpenEyeIcon className="icon-lg" />
          </i>
        </div>
      </div>
    </Fragment>
  );
}

export default NameForm;
