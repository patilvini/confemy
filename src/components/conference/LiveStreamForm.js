import { useFormik, validateYupSchema } from "formik";

import TextError from "../formik/TextError";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import TextEditor from "../text-editor/TextEditor";

const validationSchema = yup.object({
  link: yup.string().required("Please enter a URL to your session"),
  instructions: yup.object()
  
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
      instructions: {},
      platformName: platform,
    };

      try {
        const r = await api.patch("/conferences/"+conferenceId+"?deleteType="+ platform);
        console.log("added platform info", r);
  

        dispatch(createConferenceAction(r.data.data.conference));
        formik.setFieldValue("link", "")
        formik.setFieldValue("instructions", {})
      } catch (err) {
        console.error(err);
      }

    
  }
 

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

     
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"))
    }

   
  };

  function formikSetFieldValue(fieldValue) {
    formik.setFieldValue("instructions", fieldValue);
  }

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
            <div style={{width:"50%", alignSelf:"center"}}> <button type="button" onClick={()=>onDelete()} className="button button-red mb-40">Delete</button></div>
           
          </div>

              <div>
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
              <div style={{ marginTop: "2rem" }}>
                <TextEditor
                  formikSetFieldValue={formikSetFieldValue}
                  apiRawContent={conference[platform]?.instructions}
                />
                {touched.instructions && Boolean(errors.instructions) && (
                  <TextError>{errors.instructions}</TextError>
                )}
              </div>

              <button
                style={{ margin: "5rem 0" }}
                onClick={handleSubmit}
                className="button button-primary"
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
