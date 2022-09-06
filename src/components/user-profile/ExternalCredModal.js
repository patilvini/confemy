import Modal from "../modal/Modal";
import { useFormik } from "formik";
import Select from "react-select";
import * as yup from "yup";



const initialValues = {
  confName: "",
  startDate: "",
  endDate:"",
  creditType:"",
  totalCredits:""


};


const validationSchema = yup.object({
  confName: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
  endDate:yup.string().required("Required"),
  creditType:yup.string().required("Required"),
  totalCredits:yup.string().required("Required"),

  


 
});

export default function ExternalCredModal({ onDismiss }) {
  const options = [{ name: "asd", value: "dasd" }];

  const onSubmit = async (values, actions) => {
    console.log("form values form onSubmit", values);


  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Modal onDismiss={onDismiss}>
      <div className="externalCredit-modal">
        <h2>Add External Credits</h2>
        <p style={{ marginBottom: "2rem" }} className="caption-2-regular-gray3">
          Add CME Credits earned outside confemy
        </p>

        <form className="form-type-1"  autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className=" form-element material-textfield">
            <input
              id="confName"
              type="text"
              name="confName"
              value={formik.values.confName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Add conference name or CME event*</label>
          </div>

          <div className="flex-container">
            <div
              style={{ marginRight: "4rem" }}
              className=" form-element material-textfield"
            >
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>StartDate*</label>
            </div>
            <div className=" form-element material-textfield">
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>End Date*</label>
            </div>
          </div>

          <Select onChange={(e)=>{
                console.log(e)
                formik.setFieldValue("creditType", e.value)
              }} className=" form-element" options={options} />

          <div className=" form-element material-textfield">
            <input
              id="totalCredits"
              type="number"
              name="totalCredits"
              value={formik.values.totalCredits}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>

          {/* <div className=" form-element material-textfield">
            <input
              id="title"
              type="text"
              name="title"
              // value={formik.values.title}
              // onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Upload Credit Certificate*</label>
          </div> */}

          <button type="submit" style={{width:"100%"}} className=" form-element button button-primary">
            Add Credits
          </button>
        </form>
      </div>
    </Modal>
  );
}
