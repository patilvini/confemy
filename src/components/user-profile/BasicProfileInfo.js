import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";
import SelectFormType1 from "../reselect/SelectFormType1";
import { useFormik } from "formik";
import TextError from "../formik/TextError";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";

import { professions, subspecialties } from "../../utility/commonUtil";

export default function BasicProfileInfo() {
  const [displayButton, setDisplayButton] = useState(false);
  const [countryCodeList, setCountryCodeList] = useState([]);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const onSubmit = async (values, action) => {
    const formData = {
      user: {
        firstName: values.firstName,
        lastName: values.lastName,
        profession: values.profession,
        mobile: values.mobile,
        countryCode: values.countryCode,
        speciality: values.specialty,
      },
    };
    try {
      const response = await api.patch(`/users/${userProfile._id}`, formData);
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
        setDisplayButton(false);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      profession: userProfile?.profession || "",
      specialty: userProfile?.speciality || "",
      countryCode: userProfile?.countryCode || "",
      mobile: userProfile?.mobile || "",
    },
    onSubmit: onSubmit,
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

  const onInputChange = (e) => {
    setDisplayButton(true);
    formik.handleChange(e);
  };

  useEffect(() => {
    loadCountryCode();
  }, []);

  return (
    <form
      className="form-type-1"
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <h1 className="mb-30">Basic information</h1>
      <div className="grid-col-2" style={{ gap: 24 }}>
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
            {formik.touched.firstName && Boolean(formik.errors.firstName) && (
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
            {formik.touched.lastName && Boolean(formik.errors.lastName) && (
              <TextError>{formik.errors.lastName}</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="grid-col-2 my-10">
        <div className="grid-1st-col mr-24">
          <SelectFormType1
            options={professions}
            label="profession"
            value={formik.values.profession}
            onChange={(value) => {
              formik.setFieldValue("profession", value?.value);
              setDisplayButton(true);
            }}
            placeholder="Choose Profession"
            isMulti={false}
          />
          <div className="mb-24">
            {formik.touched.profession && Boolean(formik.errors.profession) && (
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
            isMulti={false}
          />
          <div className="mb-24">
            {formik.touched.specialty && Boolean(formik.errors.specialty) && (
              <TextError>{formik.errors.specialty}</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="grid-col-2 mb-18">
        <div className="grid-1st-col mr-24">
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
            isDisabled={false}
          />
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
          <div className="mb-12">
            {formik.touched.mobile && Boolean(formik.errors.mobile) && (
              <TextError>{formik.errors.mobile}</TextError>
            )}
          </div>
        </div>
      </div>
      <button
        className={displayButton ? "button button-primary" : "display-none"}
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
