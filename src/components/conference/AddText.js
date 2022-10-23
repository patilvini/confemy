import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
import TextEditor from "../text-editor/TextEditor";

const initialValues = {
  
  text: {}
  
};

const validationSchema = yup.object({
  
  text: yup.object().required("required"),
  // image: yup.array().min(1).required("Please enter your cover Image"),
  // text: yup.array(),
  // video: yup.array(),
  // linkTitle: yup.string(),
  // link2: yup.string(),
  // document: yup.array(),
});



export default function AddText({ source, active }) {
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );
  const dispatch = useDispatch()
  const conference = useSelector((state) => state.conference.newConference)
  console.log(conference)

  const onDelete = async () => {
    try{
      const r = await api.post("/conferences/step4/resources?resourceStatus=text", {
        resourceRichText :{
            text: {}
        }
            
        ,
        conferenceId: conferenceId
        })

    console.log("redux change")
    // formik.resetForm({ values: initialValues });
    dispatch(createConferenceAction(r.data.data.conference));
     
 
    } catch (err) {
      console.error(err)
    }
  }
 
  const onSubmit = async (values, actions) => {
    console.log("form on submit", formik.values);

    const resourceRichText = {
      text: values.text,
      conferenceId:conferenceId
    }

    console.log(resourceRichText)

    try{
      const r = await api.post("/conferences/step4/resources?resourceStatus=text", {
        resourceRichText :{
            text: resourceRichText.text
        }
            
        ,
        conferenceId: conferenceId
        })
        console.log("text saving" , r)

        dispatch(createConferenceAction(r.data.data.conference));
    } catch (err){
      console.err(err)
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

  function formikSetFieldValue(fieldValue) {
    formik.setFieldValue("text", fieldValue);
  }

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
            <div style={{width:"50%"}}> <button type="button" onClick={()=>onDelete()} className="button button-red mb-40">Delete</button></div>
           
          </div>

            <TextEditor
              formikSetFieldValue={formikSetFieldValue}
              apiRawContent={conference?.resourceText}
            />


            <button style={{margin:"2rem 0"}} type="submit" className="button button-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
