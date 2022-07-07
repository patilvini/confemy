import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../components/formik/TextError";
import "./modal.scss";
import api from "../../utility/api";

const validationSchema = yup.object({
  email: yup.string().required("Required"),
});

const initialValues = {
  email: "",
};

export default function Modal(props) {
  const onSubmit = async (values, actions) => {
    const organizerDetails = values;

    try {
      const res = await api.post("/organizations/organizers", {
        organizerDetails,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // console.log("form values form onSubmit", values);
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

  if (!props.show) {
    return null;
  }

  return (
    <>
      <div className="modal">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Manager</h4>
            </div>
            <div className="pmodal-body">
              <input
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                type="email"
                placeholder="email"
              />
              {touched.email && Boolean(errors.email) && (
                <TextError>{errors.email}</TextError>
              )}
            </div>
            <div className="pmodal-footer">
              <button
                onClick={() =>
                  formik.setFieldValue("organizationId", props.orgId)
                }
                type="submit"
              >
                Add
              </button>
              <button onClick={props.close}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
