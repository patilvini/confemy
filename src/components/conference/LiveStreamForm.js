import { useFormik } from "formik";
import PropTypes from "prop-types";

import TextError from "../formik/TextError";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";
import { useDispatch, useSelector } from "react-redux";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import TextEditor from "../text-editor/TextEditor";

const validationSchema = yup.object({
  link: yup.string().required("Add url for live streaming the conference."),
});

export default function LiveStreamForm({ tabName, tabIcon, tabValue }) {
  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();

  const initialValues = {
    link: newConference[tabValue]?.meetingUrl || "",
    instructions: newConference[tabValue]?.instructions || {},
  };

  const onDelete = async (streamingService) => {
    if (!newConference[tabValue]?.meetingUrl) {
      dispatch(alertAction("Ther is no saved data to delete !", "danger"));
      return;
    }
    const url = `/conferences/${newConference?._id}?deleteType=${streamingService}`;
    try {
      const response = await api.patch(url);
      if (response) {
        dispatch(createConferenceAction(response.data.data.conference));
        dispatch(alertAction("Details  deleted", "success"));
        formik.resetForm({ values: initialValues });
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
    const formData = {
      platformDetails: {
        conferenceId: newConference?._id,
        meetingUrl: values.link,
        instructions: values.instructions,
        platformName: tabValue,
      },
    };

    try {
      const response = await api.post("/conferences/step4", formData);
      if (response) {
        console.log("Livestream Submit response", response);
        dispatch(createConferenceAction(response.data.data.conference));
        dispatch(alertAction("Saved successfully", "success"));
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

  if (!tabName) {
    return null;
  }

  return (
    <>
      <div className="flex-vc mb-32">
        {tabIcon}
        <h2 className="ml-16">{tabName}</h2>
      </div>
      <div className="conf-form-wrap">
        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-24">
            <div className="material-textfield">
              <input
                id="link"
                type="text"
                name="link"
                value={formik.values.link}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Add your {tabName} link here*</label>
            </div>
            {formik.touched.link && Boolean(formik.errors.link) && (
              <TextError>{formik.errors.link}</TextError>
            )}
          </div>
          <h4>Instructions</h4>
          <div>
            <TextEditor
              setFormikFieldValue={setFormikFieldValue}
              fieldName="instructions"
              apiRawContent={newConference[tabValue]?.instructions}
            />
          </div>
          <div className="mt-24">
            <button
              className={
                !newConference[tabValue]?.meetingUrl
                  ? "button-outlined-inactive"
                  : "button button-green "
              }
              type="button"
              onClick={() => onDelete(tabValue)}
              disabled={!newConference[tabValue]?.meetingUrl ? true : false}
            >
              Delete
            </button>
            <button className="button button-primary ml-16" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

LiveStreamForm.propTypes = {
  tabName: PropTypes.string.isRequired,
  tabIcon: PropTypes.object.isRequired,
  tabValue: PropTypes.string.isRequired,
};
