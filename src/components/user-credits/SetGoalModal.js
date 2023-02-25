import { useSelector, useDispatch } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";
import { useFormik } from "formik";
import * as yup from "yup";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

import TextError from "../formik/TextError";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";

import api from "../../utility/api";
import { loadUserTotalCreditsAction } from "../../redux/user-profile/userProfileAction";

const SetGoalModal = ({ setShowGoalModal, editMode, data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const onSubmit = async (values) => {
    const formData = {
      creditDetails: {
        creditId: data._id,
        quantity: values.totalCredit,
        endDate: zonedTimeToUtc(values.endDate, timezone).toUTCString(),
        startDate: zonedTimeToUtc(values.startDate, timezone).toUTCString(),
        userId: user._id,
      },
    };

    if (editMode) {
      const editData = {
        creditDetails: {
          quantity: values.totalCredit,
        },
      };
      try {
        let response = await api.patch(
          `attendees/credits/creditGoals/${data?.creditGoalId}`,
          editData
        );
        setShowGoalModal(false);
        dispatch(loadUserTotalCreditsAction(response.data.data.allCredits));
        dispatch(alertAction(response.data.message, "success"));
      } catch (error) {
        dispatch(alertAction(error.response.data.message, "danger"));
      }
    } else {
      try {
        let response = await api.post(
          `attendees/credits/creditGoals`,
          formData
        );
        setShowGoalModal(false);
        dispatch(loadUserTotalCreditsAction(response.data.data.allCredits));
        dispatch(alertAction(response.data.message, "success"));
      } catch (error) {
        dispatch(alertAction(error.response.data.message, "danger"));
      }
    }
  };

  const startDate = new Date(data.creditGoalStartDate);
  const endDate = new Date(data.creditGoalEndDate);

  const initialValues = {
    creditType: data.creditName || data.creditName,
    totalCredit: data.goal || "",
    startDate: startDate || null,
    endDate: endDate || null,
  };

  console.log("dates----", endDate);
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
          <div className="material-textfield mb-16">
            <input
              id="creditType"
              type="text"
              name="creditType"
              value={formik.values.creditType}
              onChange={formik.handleChange}
              disabled={true}
              placeholder=" "
            />
          </div>
          <div className="mb-16">
            {formik.touched.creditType && Boolean(formik.errors.creditType) && (
              <TextError>{formik.errors.creditType}</TextError>
            )}
          </div>
          <div className="material-textfield">
            <input
              id="totalCredit"
              type="number"
              name="totalCredit"
              value={formik.values.totalCredit}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>
          <div className="mb-16">
            {formik.touched.totalCredit &&
              Boolean(formik.errors.totalCredit) && (
                <TextError>{formik.errors.totalCredit}</TextError>
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
