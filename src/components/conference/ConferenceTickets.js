import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import IsConfFree from "./IsConfFree";
import CreateTickets from "./CreateTickets";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";
import Dialogue from "../dialogue/Dialogue";

const pages = ["Is the conference free", "Create tickets"];

const ConfTicketsValSchema = [];

export default function ConferenceTickets() {
  const [open, setopen] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const isLastpage = currentPage === pages.length - 1;

  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = ConfTicketsValSchema[currentPage];

  async function onSubmit(values, actions) {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete Basic Info step first", "danger"));
      return;
    }
    // for step 0
    if (currentPage === 0) {
      const formData = {
        conferenceDetails: {
          isFree: values.isFree,
          conferenceId: newConference?._id,
          refundPolicy: values.isRefundable,
          refundDescription: values.refundDescription,
        },
      };
      const url = "conferences/step5?confStatus=true";
      try {
        const response = await api.post(url, formData);
        console.log("free status", response);
        dispatch(createConferenceAction(response.data.data.conference));
        setcurrentPage(currentPage + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
    if (isLastpage) {
      const formData = {
        conferenceDetails: {
          isFree: values.isFree,
          conferenceId: newConference?._id,
          refundPolicy: values.isRefundable,
          refundDescription: values.refundDescription,
        },
      };
      const url = "conferences/step5";
      try {
        const response = await api.post(url, formData);
        console.log("step5 res", response);
        dispatch(createConferenceAction(response.data.data.conference));
        navigate("/dashboard/create-conf/step-6");
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      isFree: newConference?.isFree || false,
      isRefundable: newConference?.refundPolicy || false,
      refundDescription: {},
    },
    onSubmit: onSubmit,
    // validationSchema:validationSchema
    enableReinitialize: true,
  });

  function renderPageContent(page) {
    switch (page) {
      case 0:
        return <IsConfFree formik={formik} />;
      case 1:
        return (
          <CreateTickets
            formik={formik}
            setFormikFieldValue={setFormikFieldValue}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  function setFormikFieldValue(fieldName, fieldValue) {
    formik.setFieldValue(fieldName, fieldValue);
  }

  const openDialogue = () => {
    setopen(true);
  };

  const closeDialogue = () => {
    setopen(false);
  };
  const yesAction = () => {
    setcurrentPage(0);
    formik.setTouched({});
    formik.setSubmitting(false);
    setopen(false);
  };

  useEffect(() => {
    if (newConference?.hasConfPayStatus) {
      setcurrentPage(1);
    }
  }, [newConference?.hasConfPayStatus]);

  return (
    <div>
      <form className="form-type-1" onSubmit={formik.handleSubmit}>
        {currentPage === 1 && (
          <div className="inactive-isitfree">
            <div>
              <h4 className="mb-8">Is it a free conference ?</h4>
              <div>Answer: {formik.values.isFree ? "Yes" : "No"} </div>
            </div>
            <div>
              <button
                onClick={openDialogue}
                type="button"
                className="button-text button-text-primary p-8"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        <div className="mb-56">{renderPageContent(currentPage)}</div>
        <div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="button button-primary "
          >
            {formik.isSubmitting
              ? "Submitting..."
              : isLastpage
              ? "Save and continue "
              : "Next"}
          </button>
        </div>
      </form>
      {open && (
        <Dialogue
          msg={`Are you sure you want to change the conference payment status?${
            formik.values.isFree
              ? "All tickets will be deleted"
              : "All tickets and refund policy will be deleted"
          }.`}
          title="Conference status"
          closeDialogue={closeDialogue}
          yesAction={yesAction}
        />
      )}
    </div>
  );
}
