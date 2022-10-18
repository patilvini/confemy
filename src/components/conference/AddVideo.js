import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
    link: "",
    instructions: {},
    // image: [],
    // text: [],
    // video: [],
    // linkTitle: "",
    // link2: "",
    // document: [],
  };

  const validationSchema = yup.object({
    link: yup.string().required("Please enter a URL to your session"),
    instructions: yup.object(),
    // image: yup.array().min(1).required("Please enter your cover Image"),
    // text: yup.array(),
    // video: yup.array(),
    // linkTitle: yup.string(),
    // link2: yup.string(),
    // document: yup.array(),
  });
export default function AddVideo ({source, active}){
    const onSubmit = (values, actions) => {
        console.log("form on submit", formik.values);
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

     

 
    return(
        <div>
            {source === active && <div>
                <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={handleSubmit}
        >

<button type="submit" className="button button-primary">Submit</button>
            <label>
              <h4>Video</h4>
            </label>

            </form>
            
          </div>}
        </div>
    )
}