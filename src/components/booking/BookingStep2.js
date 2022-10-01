import { useEffect, useRef, useState } from "react";

import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./step2.scss";
import DeleteIcon from "../icons/DeleteIcon";
import { useSelector } from "react-redux";
import api from "../../utility/api";
import { DateTime } from "luxon";
import TicketDetailsForm from "./TicketDetailsForm";
import { Form, Field, Formik } from "formik";

export default function BookingStep2() {
  const navigate = useNavigate();
  const bookingID = useParams().bookingID;
  const [data, setData] = useState();
  const [errorMail, setErrorMail] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const [errorCode, setErrorCode] = useState("")
  const ref = useRef(null);

  const [initialGuestValues, setInitialGuestValues] = useState([]);
  const userID = useSelector((state) => state.auth.user?._id);

  const onSubmit =  async (values, actions) => {
   
    const ticketDetails = {
      bookedBy: userID,
      bookingId: bookingID,
      guests: values.guests,
      whatsapp: values.whatsapp, 
      mobile: values.mobile,
      countryCode: values.countryCode,
      email: values.email
    };

    if(!ticketDetails.mobile){
      ticketDetails.mobile = ""
    }
    if(!ticketDetails.email){
      ticketDetails.email = ""
    }
    if(!ticketDetails.countryCode){
      ticketDetails.countryCode = ""
    }

   for (let i=0; i < initialGuestValues.length; i++){
 
      ticketDetails.guests[i].ticketId = initialGuestValues[i]
    }
    
    console.log("onsubmit: ", ticketDetails)

    try {
      const r = await api.post("/conferences/bookings/step2", {
        ticketDetails,
      });
      console.log(r);
    } catch (err) {
      console.log(err);
    }
 
    
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get("/conferences/bookings/" + bookingID);
        console.log();
        setData(r.data.data.bookingDetails);

        let x = [];
        for (let i = 0; i < r.data.data.bookingDetails.tickets.length; i++) {
          for (
            let j = 0;
            j < r.data.data.bookingDetails.tickets[i].quantity;
            j++
          ) {
            x.push(r.data.data.bookingDetails.tickets[i]._id);
          }
        }

        setInitialGuestValues(x);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     guests: [],
  //     whatsapp: "",
  //     mobile: "",
  //     countryCode: "",
  //     email: "",
  //   },
  //   validationSchema,
  //   onSubmit,
  // });

  function validatemail(value) {
    if (!value) {
      setErrorMail("Required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setErrorMail("Invalid email address");
    } else {
      setErrorMail(""); 
    }
    return errorMail;
  }

  const getVals = () => {
    return ref.current.values
}

  function validatemobile(value) {

    let whatsapp = getVals().whatsapp
    
    if (!whatsapp && !value) {
      setErrorMobile("");
    } else if(whatsapp && !value){
      setErrorMobile("Required")

    } else if (!/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/i.test(value)) {
      setErrorMobile("Invalid mobile number");
    } else {
      setErrorMobile("");
    }
    return errorMobile;
  }

  function validatecode(value) {

    let whatsapp = getVals().whatsapp
    
    if (!whatsapp && !value) {
      setErrorCode("");
    } else if(whatsapp && !value){
      setErrorCode("Required")

    } else if (!/^(\+?\d{1,3}|\d{1,4})$/i.test(value)) {
      setErrorCode("Invalid mobile number");
    } else {
      setErrorCode("");
    }
    return errorCode;
  }

  return (
    <div className="form-type-1">
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

        {data?.tickets.map((item, index) => {
          const date = DateTime.fromISO(data.conference.startDate);

          let scheduleDate = date.toLocaleString({
            ...DateTime.DATE_MED_WITH_WEEKDAY,
            weekday: "short",
          });

          return (
            <div key={index} className="table-grid">
              <div className="table-grid-item">
                <p className="table-item">{item.ticketId.name}</p>
                <p className="table-description">{scheduleDate}</p>
              </div>

              <div className="table-grid-item">
                <p className="table-description">{item.quantity}</p>
              </div>
              <div className="table-grid-item">
                <p className="table-description">
                  {item.ticketId.currency}
                  {item.ticketId.price}
                </p>
              </div>
              <div className="table-grid-item">
                <DeleteIcon fill={"#08415c"} />
              </div>
            </div>
          );
        })}

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
              <div style={{ marginRight: " 7rem" }}>
                <p className="table-item"> Total</p>
              </div>
              <div>
                <p className="table-item">
                  {data?.conference.currency}
                  {data?.totalPrice}
                </p>
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

        <Formik
          innerRef={ref}
          initialValues={{
            initialValues: {
              guests: [],
              whatsapp: "",
              mobile: "",
              countryCode: "",
              email: "",
            },
          }}
          onSubmit={onSubmit}
        >
          {({ errors, touched, validateField, validateForm }) => (
            <Form>
              {initialGuestValues?.map((item, index) => {
                return (
                  <div key={index}>
                    <TicketDetailsForm
                      index={index}
                      item={item}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                );
              })}

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
                    style={{ width: "35%", margin: "0 0rem 2rem 0rem" }}
                    className="material-textfield"
                  >
                    <Field
                      name={"countryCode"}
                      validate={validatecode}
                      type="text"
                      placeholder=" "
                    />
                    <label>Country Code</label>
                    <div>{errors && <p>{errorCode}</p>}</div>
                  </div>
                  <div
                    style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
                    className="material-textfield"
                  >
                    <Field
                      name={"mobile"}
                      validate={validatemobile}
                      type="text"
                      placeholder=" "
                    />
                    <label>Mobile</label>
                    <div>{errors && <p>{errorMobile}</p>}</div>
                  </div>
                  <div
                    style={{ width: "50%", margin: "2.5rem 2rem" }}
                    className="material-textfield"
                  >
                    <Field
                      name="whatsapp"
                      type="checkbox"
                      style={{ marginLeft: "1rem" }}
                    />

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
                    <Field
                      validate={validatemail}
                      name={"email"}
                      type="email"
                      placeholder=" "
                    />
                    <label>Email</label>
                    <div>{errors && <p>{errorMail}</p>}</div>
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
                <div style={{ margin: "4rem 2.5rem 4rem 0rem" }}>
                  <button type="submit" className="button button-primary">
                    Continue
                  </button>
                </div>
                <div>
                  <button
                    style={{ margin: "4rem 2.5rem 10rem 0rem" }}
                    className="button button-secondary "
                  >
                    Go back
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
