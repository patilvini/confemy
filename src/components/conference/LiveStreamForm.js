import { useFormik, validateYupSchema } from "formik";

import TextError from "../formik/TextError";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import TextEditor from "../text-editor/TextEditor";
import DeleteIcon from "../icons/DeleteIcon";

const validationSchema = yup.object({
  link: yup.string().required("Please enter a URL to your session"),
  instructions: yup.object(),
});

export default function LiveStreamForm({ source, active, platform }) {
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );
  const conference = useSelector((state) => state.conference.newConference);

  const dispatch = useDispatch();

  const initialValues = {
    link: conference[platform]?.meetingUrl || "",
    instructions: conference[platform]?.instructions || {},
  };

  const onDelete = async () => {
    const platformDetails = {
      conferenceId: conferenceId,
      meetingUrl: "",
      instructions: null,
      platformName: platform,
    };

    try {
      const r = await api.patch(
        "/conferences/" + conferenceId + "?deleteType=" + platform
      );
      console.log("deleted", r);

      dispatch(createConferenceAction(r.data.data.conference));
      dispatch(alertAction("Platform Details successfully deleted", "success"));
      
      formik.resetForm();
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const onSubmit = async (values, actions) => {
    console.log("form on submit", values);

    const platformDetails = {
      conferenceId: conferenceId,
      meetingUrl: values.link,
      instructions: values.instructions,
      platformName: platform,
    };

    try {
      const r = await api.post("/conferences/step4", { platformDetails });
      // console.log("added platform info", r);

      dispatch(createConferenceAction(r.data.data.conference));
      dispatch(alertAction("Link and instructions saved", "success"));
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

  return (
    <div>
      {active === source && (
        <div>
          <div className="conf-form-wrap">
            <form
              className="form-type-1"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="opposite-grid">
                <h1>{source}</h1>
                {conference[platform]?.meetingUrl?.length > 0 && (
                  <div style={{ alignSelf: "center" }}>
                    {" "}
                    <button
                      type="button"
                      onClick={() => onDelete()}
                      className="delete-button-icon"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-20">
                <div className="material-textfield">
                  <input
                    id="link"
                    type="text"
                    name="link"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    placeholder=" "
                  />
                  <label>Add your {source} link here*</label>
                </div>
                {touched.link && Boolean(errors.link) && (
                  <TextError>{errors.link}</TextError>
                )}
              </div>
              <div className="mt-20">
                <TextEditor
                  setFormikFieldValue={setFormikFieldValue}
                  fieldName="instructions"
                  apiRawContent={conference[platform]?.instructions}
                />
                
              </div>

              <button
                
                onClick={handleSubmit}
                className="button button-primary my-40"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
