import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../pages/organizer-profile-page/Modal";
import TextInput from "../formik/TextInput";
import NameForm from "../register/NameForm";
import Signin from "../signin/Signin";
import "./step2.scss";
import DeleteIcon from "../icons/DeleteIcon";

const initialValues = {
  name: "",
};

const validationSchema = {};

export default function BookingStep2() {
  const onSubmit = (values, actions) => {
    console.log(values);
  };

  const navigate = useNavigate();
  const confID = useParams().confID;

  return (
    <div>
      <div className="step2-wrapper">
        <div className="step2-section-heading">
          <h3>Confirm cart details and pay</h3>
        </div>

        <div className="flex-container-std">
          <div>
            <h3 style={{ color: "#08415c" }}>Order Summary</h3>
          </div>
          <div>
            <button className="edit-button">Edit</button>
          </div>
        </div>

        <div className="table-grid-heading">
          <div className="table-grid-item">
            <span className="table-heading">ITEM</span>
          </div>
          <div className="table-grid-item">
            <span className="table-heading">QTY</span>
          </div>
          <div className="table-grid-item">
            <span className="table-heading">SUBTOTAL</span>
          </div>
          <div className="table-grid-item"> </div>
        </div>

        <div className="table-grid">
          <div className="table-grid-item">
            <p className="table-item">Ticket Type 1</p>
            <p className="table-description">April 30, 10 PM, GMT+4</p>
          </div>

          <div className="table-grid-item">
            <p className="table-description">2</p>
          </div>
          <div className="table-grid-item">
            <p className="table-description">$20</p>
          </div>
          <div className="table-grid-item">
            <DeleteIcon fill={"#08415c"} />
          </div>
        </div>

        <hr className="divider" />

        <div className="table-grid">
          <div className="table-grid-item"></div>
          <div className="table-grid-item"></div>
          <div className="table-grid-item"></div>
          <div className="table-grid-item">
            <div className="flex-container-std">
              <div style={{ marginRight: " 2rem" }}>
                <p className="table-description"> +Convenience Fee</p>
              </div>
              <div>
                <p className="table-description"> 0 </p>
              </div>
            </div>
          </div>
          <div className="table-grid-item"></div>
          <div className="table-grid-item"></div>
          <div className="table-grid-item"></div>
          <div className="table-grid-item">
            <div className="flex-container-std">
              <div style={{ marginRight: " 10rem" }}>
                <p className="table-item"> Total</p>
              </div>
              <div>
                <p className="table-item"> $20</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <h3
          style={{
            color: "#08415c",
            marginTop: "9.75rem",
            marginBottom: "4rem",
          }}
        >
          Guest Details
        </h3>
        <h4>Guest 1 Ticket Type 1</h4>

        <div style={{ marginTop: "1.6rem" }} className="form-type-1 ">
          <div className="flex-container-std">
            <div
              style={{ width: "50%", margin: "0 2rem 2rem 0rem" }}
              className="material-textfield"
            >
              <input
                id="title"
                type="text"
                name="title"
                // value={formik.values.title}
                // onChange={formik.handleChange}
                placeholder=" "
              />
              <label>First Name*</label>
            </div>
            <div
              style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
              className="material-textfield"
            >
              <input
                id="title"
                type="text"
                name="title"
                // value={formik.values.title}
                // onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Last Name*</label>
            </div>
          </div>
          <div className="material-textfield">
            <input
              id="title"
              type="text"
              name="title"
              // value={formik.values.title}
              // onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Email*</label>
          </div>
        </div>

        <hr className="divider" />

        <h3
          style={{
            color: "#08415c",
            marginTop: "9.75rem",
            marginBottom: "4rem",
          }}
        >
          Ticket Details
        </h3>
        <div className="form-type-1">
          <div className="flex-container-std">
            <div
              style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
              className="material-textfield"
            >
              <input
                id="title"
                type="text"
                name="title"
                // value={formik.values.title}
                // onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Mobile</label>
            </div>
            <div
              style={{ width: "50%", margin: "2.5rem 2rem" }}
              className="material-textfield"
            >
              <input type="checkbox" style={{ marginLeft: "1rem" }} />

              <span className="table-item" style={{ marginLeft: "1rem" }}>
                Get your ticket on whatsapp
              </span>
            </div>
          </div>

          <div className="flex-container-std form-type-1">
            <div
              style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
              className="material-textfield"
            >
              <input
                id="title"
                type="text"
                name="title"
                // value={formik.values.title}
                // onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Email</label>
            </div>
            <div
              style={{ width: "50%", margin: "2.5rem 2rem" }}
              className="material-textfield"
            >
              <span className="table-item" style={{ marginLeft: "1rem" }}>
                Your e-tickets will be sent to this address
              </span>
            </div>
          </div>
        </div>


        <div className="flex-container-std">
          <div style={{margin:"4rem 2.5rem 4rem 0rem"}}>
            <button className="button button-primary">Continue</button>

          </div>
          <div>
            <button style={{margin:"4rem 2.5rem 10rem 0rem"}} className="button button-secondary ">Go back</button>

          </div>
        </div>
      </div>
    </div>
  );
}
