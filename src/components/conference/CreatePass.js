import { useFormik } from "formik";
import { useEffect, useState } from "react";
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

const initialValues = {
  type: "",
  passName: "",
  passInfo: "",
  quantity: "",
  currency: "",
  price: "",
  saleStartDate: "",
};

const currencies = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
  { value: "EUR", label: "EUR" },
];

export default function CreatePass() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const call = async () => {
      try {
        const r = await api.get("conferences/62e0f66f9f2a6559fceca71a");
        setTickets(r.data.data.conferences.tickets);
        console.log(r.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    call();
  }, []);

  const [disabled, setdisabled] = useState(false);

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
      conferenceId: "62e0f66f9f2a6559fceca71a",
    };

    console.log(ticketDetails);

    try {
      const r = await api.post("/conferences/step5", { ticketDetails });
      console.log(r);
      setVisibitly(false)
    } catch (err) {
      console.log(err);
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
            {tickets.map((item) => {
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
                <div className="flex-container">
                  <div className="flex-item">
                    <button
                      type="button"
                      id="free"
                      name="type"
                      value="FREE"
                      className="button button-primary"
                      onClick={() => {
                        formik.setFieldValue("type", "FREE");
                        formik.setFieldValue("currency", "none");
                        formik.setFieldValue("price", 0);

                        setdisabled(true);
                      }}
                    >
                      Free
                    </button>
                  </div>
                  <div className="flex-item">
                    <button
                      type="button"
                      id="paid"
                      name="type"
                      className="button button-green"
                      value="PAID"
                      onClick={() => {
                        formik.setFieldValue("type", "PAID");
                        setdisabled(false);
                      }}
                    >
                      Paid
                    </button>
                  </div>
                </div>

                <div className="input-container">
                  <input
                    onChange={formik.handleChange}
                    name="passName"
                    type="text"
                    placeholder="Pass Name"
                  />
                  {formik.touched.passName &&
                    Boolean(formik.errors.passName) && (
                      <TextError>{formik.errors.passName}</TextError>
                    )}
                </div>
                <div className="input-container">
                  <input
                    onChange={formik.handleChange}
                    name="passInfo"
                    type="text"
                    placeholder="Pass Info"
                  />
                  {formik.touched.passInfo &&
                    Boolean(formik.errors.passInfo) && (
                      <TextError>{formik.errors.passInfo}</TextError>
                    )}
                </div>
                <div className="input-container">
                  <input
                    onChange={formik.handleChange}
                    name="quantity"
                    type="text"
                    placeholder="Available Quantity"
                  />
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
                  <input
                    onChange={formik.handleChange}
                    name="price"
                    type="number"
                    placeholder="Price"
                    disabled={disabled}
                  />
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
                  <div className="flex-item">
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => setVisibitly(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex-item">
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
