import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import * as yup from "yup";
import TextError from "../formik/TextError";

import SelectFormType1 from "../reselect/SelectFormType1";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import {
  loadCountryListAction,
  loadStateListAction,
  loadCityListAction,
} from "../../redux/list/listAction";

const validationSchema = yup.object().shape({
  practiceName: yup.string().required("Required"),
  street1: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  country: yup.string().required("Required"),
  zipcode: yup.string().required("Required"),
});

export default function PracticeAddressForm({
  practice,
  editMode,
  setEditMode,
  setShowAddressForm,
}) {
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const { countryList, stateList, cityList } = useSelector(
    (state) => state.list
  );

  const dispatch = useDispatch();

  const onSubmit = async (values, action) => {
    const formAddress = {
      name: values.practiceName,
      addressLine1: values.street1,
      addressLine2: values.street2 || "",
      state: values.state,
      country: values.country,
      city: values.city,
      zipcode: values.zipcode,
    };
    let addresses = [];

    if (editMode) {
      addresses = userProfile?.practiceAddress.map((item) =>
        item._id === practice._id ? formAddress : item
      );
    }

    if (!editMode && userProfile?.practiceAddress?.length > 0) {
      addresses = [formAddress, ...userProfile?.practiceAddress];
    }
    if (!editMode && !userProfile?.practiceAddress?.length > 0) {
      addresses = [formAddress];
    }
    const formData = {
      user: {
        practiceAddress: addresses,
      },
    };

    try {
      const response = await api.patch(`/users/${userProfile._id}`, formData);
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
        if (editMode) {
          setEditMode(false);
        } else {
          setShowAddressForm(false);
        }
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const initialValues = {
    practiceName: practice?.name || "",
    street1: practice?.addressLine1 || "",
    street2: practice?.addressLine2 || "",
    state: practice?.state || "",
    country: practice?.country || "",
    city: practice?.city || "",
    zipcode: practice?.zipcode || "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const loadCountryList = async () => {
    const url = `venues/countryList`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadCountryListAction(response.data.data.countries));
        const { countries } = response.data.data;
        if (editMode && practice?.country) {
          const Id = countries.find(
            (country) => country.label === practice?.country
          )?.countryId;
          loadStateList(Id);
        }
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const loadStateList = async (countryId) => {
    const url = `venues/stateList?countryId=${countryId}`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadStateListAction(response.data.data.states));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const loadCityList = async (stateId) => {
    const url = `venues/cityList?stateId=${stateId}`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadCityListAction(response.data.data.cities));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
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
        (country) => country.value === practice?.country
      )?.countryId;
    }
    if (myCountryId) {
      loadStateList(myCountryId);
    }
  }, []);

  useEffect(() => {
    let myStateId;
    if (stateList.length > 0) {
      myStateId = stateList.find(
        (state) => state.value === practice?.state
      )?.stateId;
    }
    if (myStateId) {
      loadCityList(myStateId);
    }
  }, [stateList]);

  return (
    <>
      <form
        className="form-type-1 as-basicinfo-wrap mb-24"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid-col-2">
          <div style={{ gridColumn: "1/-1" }}>
            <div className="material-textfield">
              <input
                id="practiceName"
                type="text"
                name="practiceName"
                value={formik.values.practiceName}
                onChange={formik.handleChange}
                placeholder=" "
                disabled={false}
              />
              <label>Practice Name*</label>
            </div>
            <div className="mb-24">
              {Boolean(formik.errors.practiceName) && (
                <TextError>{formik.errors.practiceName}</TextError>
              )}
            </div>
          </div>
          <div className="grid-1st-col">
            <div className="material-textfield">
              <input
                id="street1"
                type="text"
                name="street1"
                value={formik.values.street1}
                onChange={formik.handleChange}
                placeholder=" "
                disabled={false}
              />
              <label>Address line 1</label>
            </div>
            <div className="mb-24">
              {Boolean(formik.errors.street1) && (
                <TextError>{formik.errors.street1}</TextError>
              )}
            </div>
          </div>
          <div className="grid-2nd-col">
            <div className="material-textfield">
              <input
                id="street2"
                type="text"
                name="street2"
                value={formik.values.street2}
                onChange={formik.handleChange}
                placeholder=" "
                disabled={false}
              />
              <label>Address line 2</label>
            </div>
            <div className="mb-24">
              {Boolean(formik.errors.street2) && (
                <TextError>{formik.errors.street2}</TextError>
              )}
            </div>
          </div>
          <div className="grid-1st-col">
            <SelectFormType1
              options={countryList}
              value={formik.values.country}
              isMulti={false}
              onChange={(value) => {
                if (formik.values.country !== value?.value) {
                  formik.setFieldValue("state", "");
                  formik.setFieldValue("city", "");
                }
                formik.setFieldValue("country", value?.value);
                loadStateList(value?.countryId);
              }}
              // onBlur={() => formik.setFieldTouched("country")}
              placeholder="Select country"
              isDisabled={false}
              name="country"
            />

            <div className="mb-24">
              {Boolean(formik.errors.country) && (
                <TextError>{formik.errors.country}</TextError>
              )}
            </div>
          </div>

          <div className="grid-2nd-col">
            <ReloadableSelectFormType1
              options={stateList}
              value={formik.values.state}
              isMulti={false}
              onChange={(value) => {
                if (formik.values.state !== value?.value) {
                  formik.setFieldValue("city", "");
                }
                formik.setFieldValue("state", value?.value);
                loadCityList(value?.stateId);
              }}
              placeholder="Select state"
              isDisabled={false}
              name="state"
            />

            <div className="mb-24">
              {Boolean(formik.errors.state) && (
                <TextError>{formik.errors.state}</TextError>
              )}
            </div>
          </div>
          <div className="grid-1st-col">
            <ReloadableSelectFormType1
              options={cityList}
              value={formik.values.city}
              isMulti={false}
              onChange={(value) => {
                formik.setFieldValue("city", value?.value);
              }}
              placeholder="Select city"
              isDisabled={false}
              name="city"
            />
            <div className="mb-24">
              {Boolean(formik.errors.city) && (
                <TextError>{formik.errors.city}</TextError>
              )}
            </div>
          </div>
          <div className="grid-2nd-col">
            <div className="material-textfield">
              <input
                id="zipcode"
                type="text"
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                placeholder=" "
                disabled={false}
              />
              <label>Zip Code*</label>
            </div>
            <div className="mb-24">
              {Boolean(formik.errors.zipcode) && (
                <TextError>{formik.errors.zipcode}</TextError>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            className="button button-primary mr-24"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Save
          </button>
          <button
            onClick={() => {
              if (editMode) {
                formik.resetForm({ values: initialValues });
                setEditMode(false);
              } else {
                setShowAddressForm(false);
              }
            }}
            className="button-text button-text-red"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

PracticeAddressForm.propTypes = {
  practice: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func,
  setShowAddressForm: PropTypes.bool,
};
