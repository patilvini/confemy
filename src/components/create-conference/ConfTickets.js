import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import CreateTickets from "./CreateTickets";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

export default function ConfTickets() {
  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(values, actions) {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete Basic Info step first", "danger"));
      return;
    }

    const formData = {
      conferenceDetails: {
        conferenceId: newConference?._id,
        refundPolicy: values.isRefundable,
        refundDescription: values.refundDescription,
      },
    };
    const url = "conferences/step5";
    try {
      const response = await api.post(url, formData);
      dispatch(createConferenceAction(response.data.data.conference));
      navigate("/dashboard/create-conf/step-6");
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  const formik = useFormik({
    initialValues: {
      isRefundable: newConference?.refundPolicy || false,
      refundDescription: {},
    },
    onSubmit: onSubmit,
    // validationSchema:validationSchema
    enableReinitialize: true,
  });

  function setFormikFieldValue(fieldName, fieldValue) {
    formik.setFieldValue(fieldName, fieldValue);
  }

  return (
    <div>
      <form className="form-type-1" onSubmit={formik.handleSubmit}>
        <div className="mb-56">
          <CreateTickets
            formik={formik}
            setFormikFieldValue={setFormikFieldValue}
          />
        </div>
        <div className="mb-72">
          <SubmitCancelButtonWithLoader
            isSubmitting={formik.isSubmitting}
            isValid={formik.isValid}
          />
        </div>
      </form>
    </div>
  );
}
