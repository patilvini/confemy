import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import SelectFormType1 from "../reselect/SelectFormType1";
import TextError from "../formik/TextError";

import { professions, subspecialties } from "../../utility/commonUtil";

import CancelIcon from "../icons/CancelIcon";
import Switch from "./Switch";
import RichTextEditor from "../rich-text-editor/RichTextEditor";

import { createConferenceAction } from "../../redux/conference/conferenceAction";

import "./createConference.styles.scss";
import api from "../../utility/api";

const initialValues = {
  professions: [],
  specialities: [],
  tTag: "",
  tags: [],
  isAccredited: false,
  creditAmount: Number,
  creditType: "",
  credits: [],
  isRefundable: false,
  refundDescription: {},
};

const validationSchema = {};

export default function ConferenceDetails1() {
  // const [tag, setTag] = useState("");
  // const [tagsArray, setTagsArray] = useState(["Love it"]);
  // const [tagsArray, setTagsArray] = useState(["Love it"]);
  const [creditOptions, setcreditOptions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newConference = useSelector((state) => state.conference.newConference);

  async function onSubmit(values, actions) {
    if (newConference?.completedStep > 0) {
      console.log("detials1 values", values);
      const {
        professions,
        specialities,
        tags,
        isAccredited,
        isRefundable,
        credits,
        refundDescription,
      } = values;
      const formData = {
        conferenceDetails: {
          conferenceId: newConference?._id,
          professions,
          specialities,
          tags,
          isAccredited,
          credits,
          refundPolicy: isRefundable,
          refundDescription,
        },
      };

      try {
        const response = await api.post("conferences/step2", formData);
        if (response) {
          console.log(response);
          dispatch(createConferenceAction(response.data.data.conference));
          navigate("/dashboard/create-conference/step-3");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("First complete Step-1");
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  // const onTagChange = (event) => {
  //   setTag(event.target.value);
  // };

  // const handleEditorChange = (state) => {
  //   setEditorState(state);
  //   formik.setFieldValue(
  //     "refundPolicy",
  //     convertToRaw(editorState.getCurrentContent())
  //   );
  // };

  async function getCreditTypes() {
    try {
      const response = await api.get("conferences/credits");
      if (response) {
        setcreditOptions(response.data.data.credits);
      }
    } catch (err) {
      if (err) console.log(err);
    }
  }

  useEffect(() => {
    getCreditTypes();
  }, []);

  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <section className="mb-72">
          <h2>Details 1</h2>
          <h4>Professions</h4>
          <SelectFormType1
            options={professions}
            label="professions"
            name="professions"
            placeholder="Choose Professions"
            handleChange={(options) => {
              formik.setFieldValue(
                "professions",
                options.map((option) => option.value)
              );
            }}
            isMulti={true}
          />
          <div className="mb-24">
            {formik.touched.professions &&
              Boolean(formik.errors.professions) && (
                <TextError>{formik.errors.professions}</TextError>
              )}
          </div>
          <h4>specialties</h4>
          <SelectFormType1
            options={subspecialties}
            label="specialities"
            name="specialities"
            placeholder="Choose specialities"
            handleChange={(options) => {
              formik.setFieldValue(
                "specialities",
                options.map((option) => option.value)
              );
            }}
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
                    // setTagsArray((prev) => prev.filter((e) => e != tg));
                    formik.setFieldValue(
                      "tags",
                      formik.values.tags.filter((e) => e != tg)
                    );
                  }}
                >
                  <CancelIcon className="xs-icon" />
                </i>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }} className="material-textfield">
              <input
                id="tTag"
                type="text"
                name="tTag"
                // value={tag}
                value={formik.values.tTag}
                // onChange={onTagChange}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Tags</label>
            </div>
            <div>
              <button
                onClick={() => {
                  // setTagsArray([...tagsArray, tag]);
                  // formik.setFieldValue("tags", tagsArray);
                  // setTag("");
                  formik.setFieldValue("tags", [
                    ...formik.values.tags,
                    formik.values.tTag,
                  ]);
                  formik.setFieldValue("tTag", "");
                }}
                type="button"
                className="button button-primary ml-16"
              >
                Add Tags
              </button>
            </div>
          </div>
          <div className="mb-24">
            {formik.touched.tTag && Boolean(formik.errors.tTag) && (
              <TextError>{formik.errors.tTag}</TextError>
            )}
          </div>
        </section>
        <section className="mb-72">
          <h2>Credits</h2>
          <div className="flex-vc mb-24">
            <p className="caption-1-regular-gray3 mr-16">
              Is this conference accredited?
            </p>
            <Switch
              id="isAccredited"
              name="isAccredited"
              value="isAccredited"
              checked={formik.values.isAccredited}
              onChange={formik.handleChange}
            />
          </div>

          <ul className="tags-display">
            {formik.values.credits.map((credit) => (
              <li key={credit.creditId}>
                {credit.label} - {credit.quantity}
                <i
                  onClick={(e) => {
                    // setTagsArray((prev) => prev.filter((e) => e != tg));
                    formik.setFieldValue(
                      "credits",
                      formik.values.credits.filter((e) => e != credit)
                    );
                  }}
                >
                  <CancelIcon className="xs-icon" />
                </i>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <div className="grid-col-2">
                <div className="grid-1st-col">
                  <SelectFormType1
                    options={creditOptions}
                    label="Credit Type"
                    name="creditType"
                    handleChange={(option) => {
                      formik.setFieldValue("creditType", option);
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
                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="creditAmount"
                      type="number"
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
                className="button button-primary ml-16"
                onClick={() => {
                  formik.setFieldValue("credits", [
                    ...formik.values.credits,
                    {
                      label: formik.values.creditType?.label,
                      creditId: formik.values.creditType?.value,
                      quantity: formik.values.creditAmount,
                    },
                  ]);
                  formik.setFieldValue("creditType", "");
                  formik.setFieldValue("creditAmount", Number);
                }}
              >
                Add Credit
              </button>
            </div>
          </div>
        </section>
        <section className="mb-72">
          <h2>Refund Policy</h2>
          <div className="flex-vc mb-24">
            <p className="caption-1-regular-gray3 mr-16">
              Is the conference refundable?
            </p>
            <Switch
              id="isRefundable"
              name="isRefundable"
              value="isRefundable"
              checked={formik.values.isRefundable}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <RichTextEditor
              setFieldValue={(val) =>
                formik.setFieldValue("refundDescription", val)
              }
            />
          </div>
        </section>
        <section className="mb-72">
          <button type="button" className="button button-green mr-8">
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Next
          </button>
        </section>
      </form>
    </main>
  );
}
