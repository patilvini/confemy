import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
import TextEditor from "../text-editor/TextEditor";
import DeleteIcon from "../icons/DeleteIcon";
import TextError from "../formik/TextError";
import { useEffect } from "react";

const validationSchema = yup.object({
  text: yup.object().required("required"),
});

export default function AddText({ source, active }) {
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );
  const dispatch = useDispatch();
  const conference = useSelector((state) => state.conference.newConference);
  // console.log(conference)

  const initialValues = {
    text: conference?.resourceText || {},
  };

  const onDelete = async () => {
    try {
      const r = await api.post(
        "/conferences/step4/resources?resourceStatus=text",
        {
          resourceRichText: {
            text: {},
          },

          conferenceId: conferenceId,
        }
      );

      console.log("delete")
      // formik.resetForm({ values: initialValues });
      dispatch(createConferenceAction(r.data.data.conference));
      dispatch(alertAction("Text deleted successfully", "success"));
      formik.resetForm({});
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const onSubmit = async (values, actions) => {
    console.log("form on submit", formik.values);

    const resourceRichText = {
      text: values.text,
      conferenceId: conferenceId,
    };

    // console.log(resourceRichText)

    try {
      const r = await api.post(
        "/conferences/step4/resources?resourceStatus=text",
        {
          resourceRichText: {
            text: resourceRichText.text,
          },

          conferenceId: conferenceId,
        }
      );
      // console.log("text saving" , r)

      dispatch(createConferenceAction(r.data.data.conference));
      dispatch(alertAction("Text saved", "success"));

      
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
  } = formik;

  function setFormikFieldValue(fieldName, fieldValue) {
    formik.setFieldValue(fieldName, fieldValue);
  }

  console.log(conference.resourceText)
  return (
    <div>
      {source === active && (
        <div>
          <form
            className="form-type-1"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="opposite-grid">
              <h1>Add Text</h1>
              <div>
                {conference?.resourceText && (
                  <button
                    type="button"
                    onClick={() => onDelete()}
                    className="delete-button-icon"
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-40">
              <TextEditor
                setFormikFieldValue={setFormikFieldValue}
                fieldName="text"
                apiRawContent={conference?.resourceText}
              />
            </div>

            <button type="submit" className="button button-primary mt-20">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
