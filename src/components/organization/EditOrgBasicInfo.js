import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";
import TextError from "../formik/TextError";
import * as yup from "yup";

import api from "../../utility/api";

import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";
import SelectFormType1 from "../reselect/SelectFormType1";

import {
  loadCountryList,
  loadStateList,
  loadCityList,
} from "../../utility/commonUtil";

import "./editOrgBasicInfo.styles.scss";
import { alertAction } from "../../redux/alert/alertAction";
import { loadOrganizationAction } from "../../redux/organization/organizationAction";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
});

export default function EditOrgBasicInfo({ organization, organizationId }) {
  const [showButtons, setShowButtons] = useState(false);

  const user = useSelector((state) => state.auth.user);
  //   const { organization } = useSelector((state) => state.organization);
  const { countryList, stateList, cityList } = useSelector(
    (state) => state.list
  );
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const formData = {
      organization: {
        user: user?._id,
        name: values.name,
        city: values.city,
        state: values.state,
        country: values.country,
        website: values.website,
        description: values.description,
      },
    };
    const url = `organizations/${organizationId}`;
    try {
      const response = await api.patch(url, formData);
      if (response) {
        dispatch(loadOrganizationAction(response.data.data.organization));
        setShowButtons(false);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const initialValues = {
    name: organization?.name || "",
    city: organization?.city || "",
    country: organization?.country || "",
    state: organization?.state || "",
    website: organization?.website || "",
    description: organization?.description || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  function onInputFocus(e) {
    // e.target.style.paddingBottom = "48px";
    // e.target.style.border = "solid 2px #55a0fa";
    setShowButtons(true);
  }

  function onInputBlur(e) {
    // e.target.style.paddingBottom = "1.6rem";
    // e.target.style.border = "2px solid #ced9de";
  }

  function onTextAreaFocus(e) {
    // e.target.style.transition = "0.1s ease-out";
    // e.target.style.height = "16.6rem";
    // e.target.style.border = "solid 2px #55a0fa";
    setShowButtons(true);
  }

  function onTextAreaBlur(e) {
    // e.target.style.height = "15rem";
    // e.target.style.border = "2px solid #ced9de";
  }

  function onSelectFocus(e) {
    setShowButtons(true);
  }

  const onCancel = async () => {
    let myCountryId;
    if (countryList.length > 0) {
      myCountryId = countryList.find(
        (country) => country.value === organization?.country
      )?.countryId;
    }
    if (myCountryId) {
      await loadStateList(myCountryId);
    }

    let myStateId;
    if (stateList.length > 0) {
      myStateId = stateList.find(
        (state) => state.value === organization?.state
      )?.stateId;
    }
    if (myStateId) {
      await loadCityList(myStateId);
    }
    formik.resetForm({ values: initialValues });
    setShowButtons(false);
  };

  useEffect(() => {
    if (!countryList.length > 0) {
      loadCountryList();
    }
  }, []);

  useEffect(() => {
    let myCountryId;
    if (countryList.length > 0) {
      myCountryId = countryList.find(
        (country) => country.value === organization?.country
      )?.countryId;
    }
    if (myCountryId) {
      loadStateList(myCountryId);
    }
  }, [countryList]);

  useEffect(() => {
    let myStateId;
    if (stateList.length > 0) {
      myStateId = stateList.find(
        (state) => state.value === organization?.state
      )?.stateId;
    }
    if (myStateId) {
      loadCityList(myStateId);
    }
  }, [stateList]);

  return (
    <>
      <h2 className="mb-24">Basic Information</h2>
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="material-textfield">
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              setShowButtons(true);
            }}
            placeholder=" "
            onFocus={onInputFocus}
            // onBlur={onInputBlur}
          />
          <label>Organization name*</label>
        </div>
        <div className="mb-24">
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <div style={{ overflow: "visible" }}>
          <SelectFormType1
            options={countryList}
            value={formik.values.country}
            onChange={(value) => {
              if (formik.values.country !== value?.value) {
                formik.setFieldValue("state", "");
                formik.setFieldValue("city", "");
              }
              formik.setFieldValue("country", value?.value);
              loadStateList(value?.countryId);
              setShowButtons(true);
            }}
            placeholder="Select country*"
            isDisabled={false}
            name="country"
            onFocus={onSelectFocus}
          />
          <div className="mb-24">
            {formik.touched.country && Boolean(formik.errors.country) && (
              <TextError>{formik.errors.country}</TextError>
            )}
          </div>
        </div>

        <div>
          <ReloadableSelectFormType1
            options={stateList}
            value={formik.values.state}
            onChange={(value) => {
              if (formik.values.state !== value?.value) {
                formik.setFieldValue("city", "");
              }
              formik.setFieldValue("state", value?.value);
              loadCityList(value?.stateId);
              setShowButtons(true);
            }}
            placeholder="Select state*"
            isDisabled={false}
            name="state"
            onFocus={onSelectFocus}
          />

          <div className="mb-24">
            {formik.touched.state && Boolean(formik.errors.state) && (
              <TextError>{formik.errors.state}</TextError>
            )}
          </div>
        </div>
        <div>
          <ReloadableSelectFormType1
            options={cityList}
            value={formik.values.city}
            onChange={(value) => {
              formik.setFieldValue("city", value?.value);
              setShowButtons(true);
            }}
            placeholder="Select city*"
            isDisabled={false}
            name="city"
            onFocus={onSelectFocus}
          />
          <div className="mb-24">
            {formik.touched.city && Boolean(formik.errors.city) && (
              <TextError>{formik.errors.city}</TextError>
            )}
          </div>
        </div>

        <div className="material-textfield">
          <input
            id="website"
            type="text"
            name="website"
            value={formik.values.website}
            onChange={(e) => {
              formik.handleChange(e);
              setShowButtons(true);
            }}
            placeholder=" "
            onFocus={onInputFocus}
            // onBlur={onInputBlur}
          />
          <label>Website</label>
        </div>
        <div className="mb-24">
          {formik.touched.website && Boolean(formik.errors.website) && (
            <TextError>{formik.errors.website}</TextError>
          )}
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={(e) => {
              formik.handleChange(e);
              setShowButtons(true);
            }}
            placeholder="Describe your organization "
            onFocus={onTextAreaFocus}
            // onBlur={onTextAreaBlur}
          />
        </div>
        <div className="mb-24">
          {formik.touched.description && Boolean(formik.errors.description) && (
            <TextError>{formik.errors.description}</TextError>
          )}
        </div>
        <div className="mb-20">
          <div
            className={`${
              showButtons ? "eobi-save-buttons-wrap" : "display-none"
            }`}
          >
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="button button-primary mr-8"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="button-text button-text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
