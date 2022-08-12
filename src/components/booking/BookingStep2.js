import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../pages/organizer-profile-page/Modal";
import TextInput from "../formik/TextInput";
import NameForm from "../register/NameForm";
import Signin from "../signin/Signin";
import "./step2.scss";

const initialValues = {
    name:""

};

const validationSchema ={

}

export default function BookingStep2() {
  const onSubmit = (values, actions) => {
    console.log(values);
  };

  const navigate = useNavigate();
  const confID = useParams().confID;

  const onDismiss = () => navigate("/booking-step2/" + confID);

  return (
    <div>
      <div className="step2-wrapper">
        <div className="step2-section-heading">
          
          <h3>Confirm cart details and pay</h3>
        </div>

        <h3 style={{ color: "#08415c" }}>Contact info</h3>
        <p className="conference-card-text caption-2-regular-gray3">
          Continue as guest or
          <Link to="/signin" className="signin">
            <strong> Sign in </strong>
          </Link>
          for faster experience.{" "}
        </p>

        <div style={{marginTop: "3.6rem"}} className="form-type-1 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
                <div style={{display: "flex"}}>
                <div style={{width: "50%", marginRight:"2rem"}} className="input-container">
                <TextInput
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div style={{width: "50%"}} className="input-container">
                <TextInput 
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>

                </div>
              
              <div className="input-container">
                <TextInput
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <Modal onDismiss={onDismiss}>
        <Signin />
      </Modal>
    </div>
  );
}
