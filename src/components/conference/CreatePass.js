import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import * as yup from "yup";
import api from "../../utility/api";
import DatePicker from "../formik/DatePicker";
import SelectOne from "../formik/SelectOne";
import Modal from "../modal/Modal";

import TextInput from "../formik/TextInput";
import RadioButtons from "../formik/RadioButtons";
import TextError from "../formik/TextError";
import "./createPass.scss";
import RadioFilled from "../icons/RadioFilled";
import RadioIcon from "../icons/RadioIcon";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

const validationSchema = yup.object({
  passName: yup.string().required("Required"),
  price: yup.number().required("Required").moreThan(-1),
  currency: yup.string().required("Required"),
});

// const validationSchema2 = yup.object({
//   passName: yup.string().required("Required"),
//   // price: yup.number().required("Required").moreThan(-1),
//   // currency: yup.string().required("Required"),
// });



const currencies = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
  { value: "EUR", label: "EUR" },
];

export default function CreatePass() {
  const [tickets, setTickets] = useState([]);
  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();

  const [disabled, setdisabled] = useState(false);

  const initialValues = {
    type: "FREE",
    passName: "",
    passInfo: "",
    quantity: "",
    currency: "",
    price: "",
    saleStartDate: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  const [visibility, setVisibitly] = useState(false);

  function onClose() {
    setVisibitly(false);
  }
  function onOpen() {
    setVisibitly(true);
  }

  async function onSubmit(values, actions) {
    const ticketDetails = {
      type: values.type,
      name: values.passName,
      info: values.passInfo,
      currency: values.currency,
      quantity: values.quantity,
      price: values.price,
      saleStartDate: values.saleStartDate,
      conferenceId: newConference?._id,
    };

    console.log(ticketDetails);

    try {
      const response = await api.post("/conferences/step5", { ticketDetails });
      dispatch(createConferenceAction(response.data.data.conference));
      setVisibitly(false);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  return (
    <div className="conf-form-wrap">
      <div>
        <h2>Passes</h2>
        <table className="ticketsTable">
          <thead>
            <tr>
              <th style={{ width: "400px" }}>Pass</th>

              <th>QTY.</th>

              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {newConference?.tickets?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>

                  <td>{item.quantity}</td>

                  <td>
                    {item.currency} {item.price}
                  </td>

                  <td>
                    <button>Action</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="button button-primary" onClick={() => onOpen()}>
        Add Passes
      </button>
      {visibility && (
        <Modal onDismiss={onClose}>
          <div className="register-modal white-modal">
            <div className="modal-form-wrapper">
              <form onSubmit={formik.handleSubmit} className="form-type-1">
                <div style={{width:"50%"}} className="opposite-grid">
                  <div className="flex-container">
                    {
                      <button
                      className="radio-button-icons preview-grid-item "
                      
                        onClick={() => {
                          formik.setFieldValue("type", "FREE");
                          formik.setFieldValue("currency", "none");
                          formik.setFieldValue("price", 0);
                          setdisabled(true);
                        }}
                      >
                        {formik.values.type === "FREE" ? (
                          <RadioFilled className="icon-size" />
                        ) : (
                          <RadioIcon  className="icon-size"/>
                        )}
                      </button>
                    }

                    <div onClick={() => {
                          formik.setFieldValue("type", "FREE");
                          formik.setFieldValue("currency", "none");
                          formik.setFieldValue("price", 0);
                          setdisabled(true);
                        }} className="preview-grid-item">
                      <h3>Free</h3>
                    </div>
                  </div>

                  <div className="flex-container">
                    {
                      <button
                      className="radio-button-icons preview-grid-item"
                        onClick={() => {
                          formik.setFieldValue("type", "PAID");
                          setdisabled(false);
                        }}
                      >
                        {formik.values.type === "PAID" ? (
                          <RadioFilled className="icon-size" />
                        ) : (
                          <RadioIcon className="icon-size" />
                        )}
                      </button>
                    }

                    <div onClick={() => {
                          formik.setFieldValue("type", "PAID");
                          setdisabled(false);
                        }} className=" preview-grid-item">
                      <h3>Paid</h3>
                    </div>
                  </div>
                </div>

                <div className="input-container mt-20">
                  <div className="material-textfield">
                    <input
                      id="passName"
                      type="text"
                      name="passName"
                      value={formik.values.passName}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Pass Name*</label>
                  </div>

                  {formik.touched.passName &&
                    Boolean(formik.errors.passName) && (
                      <TextError>{formik.errors.passName}</TextError>
                    )}
                </div>
                <div className="input-container">
                  <div className="material-textfield">
                    <input
                      id="passInfo"
                      type="text"
                      name="passInfo"
                      value={formik.values.passInfo}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Pass Info</label>
                  </div>

                  {formik.touched.passInfo &&
                    Boolean(formik.errors.passInfo) && (
                      <TextError>{formik.errors.passInfo}</TextError>
                    )}
                </div>
                <div className="input-container">
                  <div className="material-textfield">
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Available Quantity</label>
                  </div>

                  {formik.touched.quantity &&
                    Boolean(formik.errors.quantity) && (
                      <TextError>{formik.errors.quantity}</TextError>
                    )}
                </div>

                <div className="input-container">
                  <Select
                    isDisabled={disabled}
                    label="currency"
                    name="currency"
                    options={currencies}
                    onChange={(value) => {
                      console.log("value from onchange handler", value.value);
                      formik.setFieldValue("currency", value.value);
                    }}
                  />
                  {formik.touched.currency &&
                    Boolean(formik.errors.currency) && (
                      <TextError>{formik.errors.currency}</TextError>
                    )}
                </div>

                <div className="input-container">
                  <div className="material-textfield">
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Price*</label>
                  </div>

                  {formik.touched.price && Boolean(formik.errors.price) && (
                    <TextError>{formik.errors.price}</TextError>
                  )}
                </div>
                <div className="input-container">
                  <input
                    type="date"
                    name="saleStartDate"
                    onChange={formik.handleChange}
                  />
                  {formik.touched.saleStartDate &&
                    Boolean(formik.errors.saleStartDate) && (
                      <TextError>{formik.errors.saleStartDate}</TextError>
                    )}
                </div>

                <div className="flex-container">
                  <div className="mr-20">
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => setVisibitly(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="">
                    <button className="button button-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
