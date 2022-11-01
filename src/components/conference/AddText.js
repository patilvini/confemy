import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
import TextEditor from "../text-editor/TextEditor";

const validationSchema = yup.object({
  text: yup.object(),
});

export default function AddText() {
  const dispatch = useDispatch();
  const newConference = useSelector((state) => state.conference.newConference);

  const initialValues = {
    text: newConference?.resourceText || {},
  };

  const onDelete = async () => {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete step-1 first", "danger"));
      return;
    }
    const url = "/conferences/step4/resources?resourceStatus=text";
    const formData = {
      resourceRichText: {
        text: null,
      },
      conferenceId: newConference?._id,
    };
    try {
      const response = await api.post(url, formData);
      if (response) {
        formik.resetForm({ values: initialValues });
        dispatch(createConferenceAction(response.data.data.conference));
        dispatch(alertAction("Text deleted successfully", "success"));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const onSubmit = async (values, actions) => {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete step-1 first", "danger"));
      return;
    }

    const url = "/conferences/step4/resources?resourceStatus=text";
    const formData = {
      resourceRichText: {
        text: values.text,
      },
      conferenceId: newConference._id,
    };
    try {
      const response = await api.post(url, formData);
      if (response) {
        dispatch(createConferenceAction(response.data.data.conference));
        dispatch(alertAction("Text saved", "success"));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  function setFormikFieldValue(fieldName, fieldValue) {
    formik.setFieldValue(fieldName, fieldValue);
  }

  return (
    <div>
      <form
        className="form-type-1"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <h2>Add Text</h2>
        <div className="mt-40">
          <TextEditor
            setFormikFieldValue={setFormikFieldValue}
            fieldName="text"
            apiRawContent={newConference?.resourceText}
          />
        </div>
        <div className="mt-24">
          <button
            className={
              !newConference?.resourceText
                ? "button-outlined-inactive"
                : "button button-green "
            }
            type="button"
            onClick={() => onDelete()}
            disabled={!newConference?.resourceText ? true : false}
          >
            Delete
          </button>
          <button className="button button-primary ml-16" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
