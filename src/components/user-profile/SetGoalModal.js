import Modal from "../modal/Modal";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../utility/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const initialValues = {
  creditType: "",
  totalCredits: "",
  endDate: "",
};

const validationSchema = yup.object({
  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
  endDate: yup.string().required("Required"),
});

export default function SetGoalModal({ onDismiss }) {
  const userID = useSelector((state) => state.auth.user?._id);
  const [credits, setCredits] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const r = await api.get("/conferences/credits");
        setCredits(r.data.data.credits);
      } catch (err) {
        console.log(err);
      }
    };
    getCredits();
  }, []);

  credits?.forEach((item) => {
    if (options.length !== credits.length) {
      options.push({ value: item._id, label: item.name });
    }
  });

  const onSubmit = async (values, actions) => {
    let creditDetails = {
      creditId: values.creditType,
      endDate: values.endDate,
      quantity: values.totalCredits,
      userId: userID,
    };
    try {
      const r = await api.post("/attendees/credits/creditGoals", {
        creditDetails,
      });
    } catch (err) {
      console.log(err);
    }

    // try {
    //   const r = await api.patch("/attendees/credits/creditGoals/"+userID, {
    //     creditDetails,
    //   });
    //   console.log(r);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Modal onDismiss={onDismiss}>
      <div className="setGoal-modal">
        <h2>Set Goal</h2>
        <p style={{ marginBottom: "2rem" }} className="caption-2-regular-gray3">
          Set goal credits to earn within a time-period.
        </p>

        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Select
            onChange={(e) => {
              console.log(e);
              formik.setFieldValue("creditType", e.value);
            }}
            className=" form-element"
            options={options}
          />

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

          <button
            type="submit"
            style={{ width: "100%" }}
            className=" form-element button button-primary"
          >
            Set Goal
          </button>
        </form>
      </div>
    </Modal>
  );
}
