import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";
import SelectFormType1 from "../reselect/SelectFormType1";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";

import { professions, subspecialties } from "../../utility/commonUtil";

const validationSchema = yup.object().shape(
  {
    firstName: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    profession: yup.string().required("Required"),
    countryCode: yup.string().when("mobile", {
      is: (v) => v?.length > 0,
      then: yup.string().required("Required"),
    }),
    mobile: yup.string().when("countryCode", {
      is: (v) => v?.length > 0,
      then: yup.string().required("Required"),
    }),
  },
  ["countryCode", "mobile"]
);

yup.object().shape({
  location: yup.object().shape(
    {
      state: yup.string().when("county", {
        is: "",
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
      county: yup.string().when("state", {
        is: "",
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
    },
    ["county", "state"]
  ),
});

export default function BasicProfileInfo() {
  const [displayButton, setDisplayButton] = useState(false);
  const [countryCodeList, setCountryCodeList] = useState([]);

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const onSubmit = async (values, action) => {
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      profession: values.profession,
      speciality: values.specialty || "",
      countryCode: values.countryCode || "",
      mobile: values.mobile || "",
    };

    // if (values.specialty) {
    //   userData.speciality = values.specialty;
    // }
    // if (values.countryCode) {
    //   userData.countryCode = values.countryCode;
    // }
    // if (values.mobile) {
    //   userData.mobile = values.mobile;
    // }

    try {
      const response = await api.patch(`/users/${userProfile._id}`, {
        user: userData,
      });
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
        setDisplayButton(false);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const initialValues = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    profession: userProfile?.profession || "",
    specialty: userProfile?.speciality || "",
    countryCode: userProfile?.countryCode || "",
    mobile: userProfile?.mobile || "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const loadCountryCode = async () => {
    const url = `venues/countryListUserAccount`;
    try {
      const response = await api.get(url);
      if (response) {
        setCountryCodeList(response.data.data.countries);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };
  console.log("dhhhhhhh", countryCodeList);

  const onInputChange = (e) => {
    setDisplayButton(true);
    formik.handleChange(e);
  };

  const onCancel = () => {
    formik.resetForm({ values: initialValues });
    setDisplayButton(false);
  };

  useEffect(() => {
    loadCountryCode();
  }, []);

  // console.log("formik", formik);

  return (
    <form
      className="form-type-1 as-basicinfo-wrap"
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <h2 className="mb-30 color-primary">Basic information</h2>
      <div className="grid-col-2">
        <div className="grid-1st-col">
          <div className="material-textfield">
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={onInputChange}
              placeholder=" "
            />
            <label>First Name</label>
          </div>
          <div className="mb-24">
            {Boolean(formik.errors.firstName) && (
              <TextError>{formik.errors.firstName}</TextError>
            )}
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="material-textfield">
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={onInputChange}
              placeholder=" "
            />
            <label>Last Name</label>
          </div>
          <div className="mb-24">
            {Boolean(formik.errors.lastName) && (
              <TextError>{formik.errors.lastName}</TextError>
            )}
          </div>
        </div>

        <div className="grid-1st-col">
          <SelectFormType1
            options={professions}
            label="profession"
            name="profession"
            placeholder="Choose Profession"
            value={formik.values.profession}
            onChange={(value) => {
              formik.setFieldValue("profession", value?.value);
              setDisplayButton(true);
            }}
          />
          <div className="mb-24">
            {Boolean(formik.errors.profession) && (
              <TextError>{formik.errors.profession}</TextError>
            )}
          </div>
        </div>
        <div className="grid-2nd-col">
          <SelectFormType1
            options={subspecialties}
            label="specialty"
            name="specialty"
            placeholder="Choose specialty"
            value={formik.values.specialty}
            onChange={(value) => {
              formik.setFieldValue("specialty", value?.value);
              setDisplayButton(true);
            }}
          />
          <div className="mb-24">
            {Boolean(formik.errors.specialty) && (
              <TextError>{formik.errors.specialty}</TextError>
            )}
          </div>
        </div>

        <div className="grid-1st-col">
          <ReloadableSelectFormType1
            label="countryCode"
            name="countryCode"
            options={countryCodeList}
            value={formik.values.countryCode}
            isMulti={false}
            onChange={(value) => {
              formik.setFieldValue("countryCode", value?.value);
              setDisplayButton(true);
            }}
            placeholder="Country Code"
          />
          <div className="mb-24">
            {Boolean(formik.errors.countryCode) && (
              <TextError>{formik.errors.countryCode}</TextError>
            )}
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="material-textfield">
            <input
              id="mobile"
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={onInputChange}
              placeholder=" "
            />
            <label>Mobile</label>
          </div>
          <div className="mb-24">
            {Boolean(formik.errors.mobile) && (
              <TextError>{formik.errors.mobile}</TextError>
            )}
          </div>
        </div>
      </div>
      {/* <button
        className={displayButton ? "button button-primary" : "display-none"}
        type="submit"
        disabled={formik.isSubmitting}
      >
        Save
      </button> */}
      <div className={displayButton ? "" : "display-none"}>
        <SubmitCancelButtonWithLoader
          isSubmitting={formik.isSubmitting}
          onCancel={onCancel}
          cancelButtonClass="button-text button-text-red"
          isValid={formik.isValid}
        />
      </div>
    </form>
  );
}
