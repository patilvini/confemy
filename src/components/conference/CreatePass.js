import { useFormik } from "formik";
import { useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import api from "../../utility/api";
import DatePicker from "../formik/DatePicker";
import SelectOne from "../formik/SelectOne";
import Modal from "../modal/Modal";

import TextInput from "../formik/TextInput";
import RadioButtons from "../formik/RadioButtons";
import TextError from "../formik/TextError";

const validationSchema1 = yup.object({
  passName: yup.string().required("Required"),
  price: yup.number().required("Required").moreThan(-1),
  currency: yup.string().required("Required"),
});

const validationSchema2 = yup.object({
  passName: yup.string().required("Required"),
  // price: yup.number().required("Required").moreThan(-1),
  // currency: yup.string().required("Required"),
});

const initialValues = {
  type: "",
  passName: "",
  passInfo: "",
  quantity: "",
  currency: "",
  price: "",
  saleStartDate: "",
};

const currencies = [{value:"USD", label:"USD"}, {value:"INR", label:"INR"}, {value:"EUR", label:"EUR"}]

export default function CreatePass() {
  const [disabled, setdisabled] = useState(false);

  const [validationSchema, setValidationSchema] = useState(validationSchema1);

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
      conferenceId: "62a0be470ba7277038691ed2",
    };

    console.log(ticketDetails);

    // try {
    //   const r = await api.post("/conferences/step5", { ticketDetails });
    //   console.log(r);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <div className="conf-form-wrap">
      <button className="" onClick={() => onOpen()}>
        Add Pass
      </button>
      {visibility && (
        <Modal onDismiss={onClose}>
          <div className="register-modal white-modal">
            <div className="modal-form-wrapper">
              <form onSubmit={formik.handleSubmit} className="form-type-1">
                <div className="input-container">
                  <button
                    type="button"
                    id="free"
                    name="type"
                    value="FREE"
                    onClick={() => {
                      formik.setFieldValue("type", "FREE");
                      formik.setFieldValue("currency", 'none')
                      formik.setFieldValue("price", 0);
                      setValidationSchema(validationSchema2);

                      setdisabled(true);
                    }}
                  >
                    Free
                  </button>

                  <br />
                  <button
                    type="button"
                    id="paid"
                    name="type"
                    value="PAID"
                    onClick={() => {
                      formik.setFieldValue("type", "PAID");
                      setdisabled(false);
                      setValidationSchema(validationSchema1);
                    }}
                  >
                    Paid
                  </button>
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
                    disabled={disabled}
                    
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
                  <input type="date" name="saleStartDate" />
                  {formik.touched.saleStartDate &&
                    Boolean(formik.errors.saleStartDate) && (
                      <TextError>{formik.errors.saleStartDate}</TextError>
                    )}
                </div>

                <button type="submit">submit</button>
                <button typr="button" onClick={() => setVisibitly(false)}>
                  cancel
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
