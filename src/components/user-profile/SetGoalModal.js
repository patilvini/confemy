import Modal from "../modal/Modal";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  creditType: "",
  totalCredits: "",
  endDate:""

};


const validationSchema = yup.object({

  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
  endDate: yup.string().required("Required"),


 
});


export default function SetGoalModal ({onDismiss}){

  const onSubmit = async (values, actions) => {
    console.log("form values form onSubmit", values);


  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });



    const options = [{name: "hello", value:"hello"}]
    return (
       <Modal onDismiss={onDismiss}>
        <div className="setGoal-modal">
            <h2>Set Goal</h2>
            <p style={{marginBottom: "2rem"}} className="caption-2-regular-gray3">Set goal credits to earn within a time-period.</p>

            <form className="form-type-1" autoComplete="off" onSubmit={formik.handleSubmit}>
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

          

          <button type="submit" style={{width:"100%"}} className=" form-element button button-primary">
            Set Goal
          </button>
            </form>






            

             
              
           
          </div>

       </Modal>
    )
}