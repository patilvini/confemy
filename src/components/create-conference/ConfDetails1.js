import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import SelectFormType1 from "../reselect/SelectFormType1";
import { professions, subspecialties } from "../../utility/commonUtil";
import CancelIcon from "../icons/CancelIcon";
import Switch from "../switch/Switch";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";
import "./createConference.styles.scss";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

const validationSchema = yup.object().shape({
  professions: yup
    .array()
    .of(yup.object())
    .min(1, "Choose professions")
    .compact(),
  specialities: yup
    .array()
    .of(yup.object())
    .min(1, "Choose specialitities")
    .compact(),
  // tag: yup.string().when("openTagsModal", {
  //   is: true,
  //   then: yup.string().required("Required"),
  // }),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "Add Tags to imrprove searchability")
    .compact(),

  credits: yup.array().when("isAccredited", {
    is: true,
    then: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required("Required"),
          quantity: yup
            .number()
            .required()
            .positive("Enter amount more than 0")
            .typeError("Enter a number"),
        })
      )
      .min(1, "Add Credit Type and Amount")
      .compact(),
  }),

  // creditAmount: yup
  //   .number()
  //   .nullable(true)
  //   .when("creditType", {
  //     is: (v) => {
  //       let value = v && v?.length > 0;
  //       return value;
  //     },
  //     then: yup
  //       .number("Give a valid number")
  //       .typeError("Enter Amount")
  //       .required("Required")
  //       .positive("Enter amount more than 0"),
  //   }),
});
export default function ConfDetails1() {
  const [creditOptions, setcreditOptions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newConference = useSelector((state) => state.conference.newConference);

  async function onSubmit(values, actions) {
    if (newConference?.completedStep > 0) {
      const { professions, specialities, tags, isAccredited, credits } = values;

      const formData = {
        conferenceDetails: {
          conferenceId: newConference?._id,
          professions,
          specialities,
          tags,
          isAccredited,
          credits,
        },
      };

      try {
        const response = await api.post("conferences/step2", formData);
        if (response) {
          dispatch(createConferenceAction(response.data.data.conference));
          navigate("/dashboard/create-conf/step-3");
          dispatch(alertAction(response.data.message, "success"));
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    } else {
      dispatch(alertAction("Complete step-1 first", "danger"));
    }
  }
  const formik = useFormik({
    initialValues: {
      professions: newConference?.professions || [],
      specialities: newConference?.specialities || [],
      // openTagsModal: false,
      tag: "",
      tags: newConference?.tags || [],
      isAccredited: newConference?.isAccredited || false,
      creditAmount: newConference?.creditAmount || 1,
      creditType: "",
      credits: newConference?.conferenceCredits || [],
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  // load credit types from backend
  async function getCreditTypes() {
    try {
      const response = await api.get("conferences/credits");
      if (response) {
        setcreditOptions(response.data.data.credits);
      }
    } catch (err) {
      if (err) dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  // add credit button onClick Call
  const addCredit = () => {
    let creditLabel;
    let creditObj;
    let match = false;
    if (formik.values.creditType) {
      creditLabel = creditOptions?.find(
        (e) => e.value === formik.values.creditType
      ).label;
    }
    if (formik.values.credits?.find((e) => e.label === creditLabel)) {
      match = true;
    }
    if (!match && formik.values.creditType && formik.values.creditAmount > 0) {
      creditObj = {
        value: formik.values.creditType,
        quantity: formik.values.creditAmount,
        label: creditLabel,
      };
      formik.setFieldValue("credits", [...formik.values.credits, creditObj]);
      // formik.setFieldValue("creditAmount", 0);
    }
  };

  //  add tags button onClick
  const addTags = () => {
    if (!formik.values.tag?.length > 0) {
      formik.setFieldError("tag", "Required");
      formik.setFieldTouched("tag", true, true);
      return;
    }
    const match = formik.values.tags.includes(formik.values.tag);

    if ((formik.values.tag?.length > 0) & !match) {
      formik.setFieldValue("tags", [...formik.values.tags, formik.values.tag]);
      formik.setFieldValue("tag", "");
      formik.setFieldValue("openTagsModal", false);
    }
  };

  useEffect(() => {
    getCreditTypes();
  }, []);

  // console.log(formik);
  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="mb-72">
          <h2>Details 1</h2>
          <h4>Professions</h4>
          <SelectFormType1
            options={professions}
            label="professions"
            value={formik.values.professions}
            onChange={(value) => {
              return formik.setFieldValue("professions", value);
            }}
            placeholder="Choose Professions"
            isMulti={true}
          />

          <div className="mb-24">
            {formik.touched.professions &&
              Boolean(formik.errors.professions) && (
                <TextError>{formik.errors.professions}</TextError>
              )}
          </div>
          <h4>Specialties</h4>
          <SelectFormType1
            options={subspecialties}
            label="specialities"
            name="specialities"
            placeholder="Choose specialities"
            value={formik.values.specialities}
            onChange={(value) => formik.setFieldValue("specialities", value)}
            isMulti={true}
          />
          <div className="mb-24">
            {formik.touched.specialities &&
              Boolean(formik.errors.specialities) && (
                <TextError>{formik.errors.specialities}</TextError>
              )}
          </div>
          <h4>Improve Searchability with Tags</h4>
          <ul className="tags-display">
            {formik.values.tags.map((tg) => (
              <li key={tg}>
                {tg}
                <i
                  onClick={(e) => {
                    formik.setFieldValue(
                      "tags",
                      formik.values.tags.filter((e) => e !== tg)
                    );
                  }}
                >
                  <CancelIcon className="xs-icon" />
                </i>
              </li>
            ))}
          </ul>
          {/* Add button for modal, now commented */}
          {/* <button
            type="button"
            onClick={() => formik.setFieldValue("openTagsModal", true)}
            className="button button-primary"
          >
            Add Tags
          </button> */}
          <div className="tags-display">
            <div style={{ flexGrow: 1 }} className="material-textfield mb-18">
              <input
                id="tag"
                type="text"
                name="tag"
                // value={tag}
                value={formik.values.tag}
                // onChange={onTagChange}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Tag</label>
            </div>
            <div>
              <button
                onClick={() => addTags()}
                type="button"
                className="button button-primary add-credit-btn"
              >
                Add Tags
              </button>
            </div>
          </div>
          <div className="mb-24">
            {formik.touched.tags && Boolean(formik.errors.tags) && (
              <TextError>{formik.errors.tags}</TextError>
            )}
          </div>
        </div>
        <div className="mb-72">
          <h2>Credits</h2>
          <div className="flex-vc mb-24">
            <p className="caption-1-regular-gray3 mr-16">
              Do you give credits for attending conference?
            </p>
            <Switch
              id="isAccredited"
              name="isAccredited"
              value="isAccredited"
              checked={formik.values.isAccredited}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-24">
            {formik.touched.credits && Boolean(formik.errors.credits) && (
              <TextError>{formik.errors.credits}</TextError>
            )}
          </div>
          <ul className="tags-display">
            {formik.values.credits.map((credit) => {
              return (
                <li key={credit?.value}>
                  {credit?.label} - {credit?.quantity}
                  <i
                    onClick={(e) => {
                      formik.setFieldValue(
                        "credits",
                        formik.values.credits.filter((e) => e !== credit)
                      );
                    }}
                  >
                    <CancelIcon className="xs-icon" />
                  </i>
                </li>
              );
            })}
          </ul>

          <div
            className={`${
              formik.values.isAccredited ? "tags-display" : "display-none"
            }`}
          >
            {/* <div
              className={`${
                formik.values.isAccredited ? null : "display-none"
              }`}
            >
              Disappear
            </div> */}
            <div style={{ flexGrow: 1 }}>
              <div className="basicInfo-grid">
                <div className="">
                  <SelectFormType1
                    options={creditOptions}
                    label="Credit Type"
                    name="creditType"
                    value={formik.values.creditType}
                    onChange={(value) => {
                      formik.setFieldValue("creditType", value?.value);
                    }}
                    placeholder="Select Credit Type"
                  />
                  <div className="mb-24">
                    {formik.touched.creditType &&
                      Boolean(formik.errors.creditType) && (
                        <TextError>{formik.errors.creditType}</TextError>
                      )}
                  </div>
                </div>
                <div className="">
                  <div className="material-textfield">
                    <input
                      id="creditAmount"
                      type="number"
                      min={1}
                      name="creditAmount"
                      value={formik.values.creditAmount}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Choose Amount</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.creditAmount &&
                      Boolean(formik.errors.creditAmount) && (
                        <TextError>{formik.errors.creditAmount}</TextError>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="button button-primary add-credit-btn"
                onClick={() => addCredit()}
              >
                Add Credit
              </button>
            </div>
          </div>
        </div>
        <div className="mb-72">
          <SubmitCancelButtonWithLoader
            isSubmitting={formik.isSubmitting}
            onCancel={() => formik.resetForm({})}
          />
        </div>
      </form>
    </main>
  );
}

// Modal to be added for tags
// {formik.values.openTagsModal && (
//   <Modal>
//     <div className="tags-modal-contentwrap white-modal">
//       <div className="modal-form-wrapper">
//         <h2 className="mb-32">Add Tag</h2>
//         <div className="form-type-1 mb-24">
//           <div className="material-textfield">
//             <input
//               id="tag"
//               type="text"
//               name="tag"
//               // value={tag}
//               value={formik.values.tag}
//               // onChange={onTagChange}
//               onChange={formik.handleChange}
//               placeholder=" "
//             />
//             <label>Tag</label>
//           </div>
//           {formik.touched.tag && Boolean(formik.errors.tag) && (
//             <TextError>{formik.errors.tag}</TextError>
//           )}
//           {/* <TextError>{formik.errors.tag}</TextError> */}
//         </div>

//         <div className="flex">
//           <button
//             type="button"
//             onClick={() => formik.setFieldValue("openTagsModal", false)}
//             className="button button-green"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={addTags}
//             type="button"
//             className="button button-primary ml-16"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   </Modal>
// )}
