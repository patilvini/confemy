import { useSelector, useDispatch } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";
import { useFormik } from "formik";
import * as yup from "yup";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";
import TextError from "../formik/TextError";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";

import api from "../../utility/api";

const SetGoalModal = ({ setShowGoalModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const creditTypesList = useSelector((state) => state.list.creditTypesList);

  const onSubmit = async (values) => {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formData = {
      creditDetails: {
        creditId: values.creditType,
        quantity: values.totalCredits,
        endDate: zonedTimeToUtc(values.endDate, timezone).toISOString(),
        startDate: zonedTimeToUtc(values.startDate, timezone).toISOString(),
        userId: user._id,
      },
    };

    try {
      let response = await api.post(`attendees/credits/creditGoals`, formData);
      console.log("goal response", response);
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "danger"));
    }
    console.log("formData", formData);
    setShowGoalModal(false);
  };

  try {
  } catch (error) {}

  const initialValues = {
    creditType: "",
    totalCredit: "",
    startDate: null,
    endDate: null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });
  return (
    <div className="ec-form-wrap pt-24">
      <div className="text-align-center mb-16">
        <h2 className="section-title-1">Set Goal</h2>
        <p className="caption-1-regular-gray3 mb-24 mt-12">
          Set goal credit to earn within a time-period
        </p>
      </div>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="form-type-1">
          <div className="mb-16">
            <ReloadableSelectFormType1
              label="creditType"
              name="creditType"
              options={creditTypesList}
              value={formik.values.creditType}
              onChange={(value) => {
                formik.setFieldValue("creditType", value?.value);
              }}
              placeholder="Credit Type"
            />
            <div className="mb-16">
              {formik.touched.creditType &&
                Boolean(formik.errors.creditType) && (
                  <TextError>{formik.errors.creditType}</TextError>
                )}
            </div>
          </div>
          <div className="material-textfield">
            <input
              id="totalCredits"
              type="number"
              name="totalCredits"
              value={formik.values.totalCredits}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>
          <div className="mb-16">
            {formik.touched.conferenceName &&
              Boolean(formik.errors.totalCredits) && (
                <TextError>{formik.errors.totalCredits}</TextError>
              )}
          </div>
          <div className="grid-col-2 mb-16">
            <div className="grid-1st-col">
              <CustomDatepicker
                id="startDate"
                name="startDate"
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                minDate={new Date()}
                maxDate={formik.values.endDate}
                placeholder="Pick start date and time"
                disabled={false}
              />
              <div className="mb-24">
                {formik.touched.startDate &&
                  Boolean(formik.errors.startDate) && (
                    <TextError>{formik.errors.startDate}</TextError>
                  )}
              </div>
            </div>

            <div className="grid-2nd-col">
              <CustomDatepicker
                id="endDate"
                name="endDate"
                selected={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                minDate={formik.values.startDate}
                placeholder="Pick end date and time"
                disabled={false}
              />
              <div className="mb-24">
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <TextError>{formik.errors.endDate}</TextError>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            style={{ width: "100%" }}
            className="button button-primary"
            type="submit"
          >
            Set Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetGoalModal;
