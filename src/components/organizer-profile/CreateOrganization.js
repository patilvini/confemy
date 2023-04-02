import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";
import api from "../../utility/api";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  state: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

const initialValues = {
  name: "",
  user: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  country: "",
};

// component start

export default function CreateOrganization() {
  const user = useSelector((state) => state.auth.user.id);

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue("bannerImage", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (values, actions) => {
    const organization = values;

    try {
      const res = await api.post("/organizations", { organization });
    } catch (err) {
      console.log(err);
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
    setFieldValue,
  } = formik;

  return (
    <>
      <div className="conf-form-wrap">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>
              <h4>Logo</h4>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-box">
                  {isDragActive ? (
                    <p className="dragbox-text">Drop the files here ...</p>
                  ) : (
                    <p className="dragbox-text">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </div>
            </label>
          </div>
          <div>
            <label>
              <h4>Basic Information</h4>
            </label>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("name", e.target.value);
                }}
                type="text"
                placeholder="Organization Name"
              />
              {touched.name && Boolean(errors.name) && (
                <TextError>{errors.name}</TextError>
              )}
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("description", e.target.value);
                }}
                type="text"
                placeholder="description"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("state", e.target.value);
                }}
                type="text"
                placeholder="State"
              />
              {touched.state && Boolean(errors.state) && (
                <TextError>{errors.state}</TextError>
              )}
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("country", e.target.value);
                }}
                type="text"
                placeholder="Country"
              />
              {touched.country && Boolean(errors.country) && (
                <TextError>{errors.country}</TextError>
              )}
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("city", e.target.value);
                }}
                type="text"
                placeholder="City"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (e.target.value.length > 1)
                    setFieldValue("website", e.target.value);
                }}
                type="text"
                placeholder="website"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setFieldValue("user", user);
            }}
            className="button button-primary"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
