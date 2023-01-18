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
} from "../../redux/list/listAction";

const validationSchema = yup.object().shape({
  licenseNumber: yup.number().required("Required"),
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
});

export default function LicenseForm({
  license,
  indx,
  editMode,
  setEditMode,
  setShowLicenseForm,
}) {
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const { countryList, stateList } = useSelector((state) => state.list);

  const dispatch = useDispatch();

  const onSubmit = async (values, action) => {
    const formLicense = {
      licenseNumber: values.licenseNumber,
      country: values.country,
      state: values.state,
    };
    let licenseData = [];
    if (editMode) {
      licenseData = userProfile?.licenses.map((item, index) =>
        index === indx ? formLicense : item
      );
    }

    if (!editMode && userProfile?.licenses?.length > 0) {
      licenseData = [formLicense, ...userProfile?.licenses];
    }

    if (!editMode && !userProfile?.licenses?.length > 0) {
      licenseData = [formLicense];
    }

    const formData = {
      user: {
        licenses: licenseData,
      },
    };

    console.log("formData", formData);

    try {
      const response = await api.patch(`/users/${userProfile._id}`, formData);
      if (response) {
        console.log("submit res", response);
        dispatch(loadUserProfileAction(response.data.data.user));
        if (editMode) {
          setEditMode(false);
        } else {
          setShowLicenseForm(false);
        }
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const initialValues = {
    country: license?.country || "",
    state: license?.state || "",
    licenseNumber: license?.licenseNumber || "",
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
        if (editMode && license?.country) {
          const Id = countries.find(
            (country) => country.label === license?.country
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

  useEffect(() => {
    if (!countryList.length > 0) {
      loadCountryList();
    }
  }, []);

  useEffect(() => {
    let myCountryId;
    if (countryList.length > 0) {
      myCountryId = countryList.find(
        (country) => country.value === license?.country
      )?.countryId;
    }
    if (myCountryId) {
      loadStateList(myCountryId);
    }
  }, []);

  return (
    <>
      <form
        className="form-type-1 mb-20"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-type-1 as-basicinfo-wrap">
          <div className="grid-col-2">
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
                placeholder="Select country"
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
                onChange={(value) => {
                  if (formik.values.state !== value?.value) {
                    formik.setFieldValue("city", "");
                  }
                  formik.setFieldValue("state", value?.value);
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
            <div style={{ gridColumn: "1/-1" }}>
              <div className="material-textfield">
                <input
                  id="licenseNumber"
                  type="text"
                  name="licenseNumber"
                  value={formik.values.licenseNumber}
                  onChange={formik.handleChange}
                  placeholder=" "
                  disabled={false}
                />
                <label>Type license number*</label>
              </div>
              <div className="mb-24">
                {Boolean(formik.errors.licenseNumber) && (
                  <TextError>{formik.errors.licenseNumber}</TextError>
                )}
              </div>
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
                setShowLicenseForm(false);
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

LicenseForm.propTypes = {
  license: PropTypes.object,
  indx: PropTypes.number,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func,
  setShowLicenseForm: PropTypes.func,
};
