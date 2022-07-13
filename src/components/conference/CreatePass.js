import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import api from "../../utility/api";
import DatePicker from "../formik/DatePicker";
import SelectOne from "../formik/SelectOne";
import Modal from "../modal/Modal";

import TextInput from "../formik/TextInput";
import RadioButtons from "../formik/RadioButtons";

const validationSchema = yup.object({
  passName: yup.string().required("Required"),
  price: yup.number().required("Required").moreThan(-1),
  currency: yup.string().required("Required"),
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

export default function CreatePass() {
  const [visibility, setVisibitly] = useState(false);

  function onClose() {
    setVisibitly(false);
  }
  function onOpen() {
    setVisibitly(true);
  }

  async function onSubmit(values, actions) {
    console.log(values);

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form className="form-type-1">
                  <div className="input-container">
                    <RadioButtons
                      name="type"
                     
                      options={[{key: "Free", value: "FREE"} , {key: "Paid", value: "PAID"} ]}
                    />
                  </div>

                  <div className="input-container">
                    <TextInput
                      name="passName"
                      type="text"
                      placeholder="Pass Name"
                    />
                  </div>
                  <div className="input-container">
                    <TextInput
                      name="passInfo"
                      type="text"
                      placeholder="Pass Info"
                    />
                  </div>
                  <div className="input-container">
                    <TextInput
                      name="quantity"
                      type="text"
                      placeholder="Available Quantity"
                    />
                  </div>

                  <div className="input-container">
                    <SelectOne label="currency" name="currency">
                      <option value="">Select a currency</option>
                      <option value="INR">Indian Rupee</option>
                      <option value="USD">US Dollar</option>
                      <option value="EUR">Euros</option>
                    </SelectOne>
                  </div>

                  <div className="input-container">
                    <TextInput name="price" type="number" placeholder="Price" />
                  </div>
                  <div className="input-container">
                    <DatePicker name="saleStartDate" />
                  </div>

                  <button type="submit">submit</button>
                  <button onClick={() => setVisibitly(false)}>cancel</button>
                </Form>
              </Formik>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
