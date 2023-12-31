import { useEffect } from "react";
import * as yup from "yup";
import api from "../../utility/api";
import { currencylist } from "../../utility/commonUtil";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";
import { zonedTimeToUtc } from "date-fns-tz";

import TextError from "../formik/TextError";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";
import SelectFormType1 from "../reselect/SelectFormType1";

import "./ticketForm.styles.scss";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  quantity: yup.number().required("Required"),
  price: yup.number().required("Required").moreThan(0),
  currency: yup.string().required("Required"),
});

export default function TicketForm({ onClose }) {
  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();

  async function onSubmit(values, actions) {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete step-1 first", "danger"));
      return;
    }

    const formData = {
      ticketDetails: {
        name: values.name,
        info: values.info,
        currency: values.currency,
        quantity: values.quantity,
        price: values.price,
        saleStartDate: zonedTimeToUtc(
          values.saleStartDate,
          newConference?.timezone
        ).toISOString(),
        conferenceId: newConference?._id,
        regularTicket: values.regularTicket,
      },
    };

    try {
      const url = "conferences/step5/tickets";
      const response = await api.post(url, formData);
      dispatch(createConferenceAction(response.data.data.conference));
      dispatch(alertAction(response.data.message, "success"));
      onClose();
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      info: "",
      currency: "",
      quantity: 1,
      price: 1,
      saleStartDate: null,
      regularTicket: newConference?.isRegularTicketCreated ? false : true,
    },
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const todaysDate = new Date();

  return (
    <div>
      <div className="mb-24">
        <h2>
          {newConference?.isRegularTicketCreated
            ? "Create ticket"
            : "Create base price ticket"}
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="form-type-1">
        <div className="mb-8">
          <div className="material-textfield">
            <input
              id="name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Ticket Name*</label>
          </div>
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <div className="mb-8">
          <div className="material-textfield">
            <input
              id="info"
              type="text"
              name="info"
              value={formik.values.info}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Ticket Info</label>
          </div>

          {formik.touched.info && Boolean(formik.errors.info) && (
            <TextError>{formik.errors.info}</TextError>
          )}
        </div>
        <div className="mb-8">
          <div className="material-textfield">
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>How many tickets of this type*</label>
          </div>

          {formik.touched.quantity && Boolean(formik.errors.quantity) && (
            <TextError>{formik.errors.quantity}</TextError>
          )}
        </div>

        <div>
          <div className="mb-8">
            <SelectFormType1
              label="currency"
              options={currencylist}
              name="currency"
              onChange={(value) =>
                formik.setFieldValue("currency", value?.value)
              }
              placeholder="Select currency"
              value={formik.values.currency}
              isDisabled={false}
            />
          </div>
          <div className="mb-8">
            <div className="material-textfield">
              <input
                id="price"
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder=" "
                disabled={false}
              />
              <label>Price*</label>
            </div>
            {formik.touched.price && Boolean(formik.errors.price) && (
              <TextError>{formik.errors.price}</TextError>
            )}
          </div>
        </div>
        <div className="mb-8">
          <CustomDatepicker
            id="saleStartDate"
            name="saleStartDate"
            selected={formik.values.saleStartDate}
            onChange={(date) => formik.setFieldValue("saleStartDate", date)}
            minDate={todaysDate}
            placeholder="Pick end date and time"
            disabled={false}
          />
          {formik.touched.saleStartDate &&
            Boolean(formik.errors.saleStartDate) && (
              <TextError>{formik.errors.saleStartDate}</TextError>
            )}
        </div>
        <div className="flex-vc mt-16">
          <button
            className="button button-green mr-8"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="button button-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
