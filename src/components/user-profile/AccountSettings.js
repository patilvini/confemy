import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import SelectFormType1 from "../reselect/SelectFormType1";
import SaveInput from "./SaveInput";
import SocialMedia from "../organization/SocialMedia";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";
import api from "../../utility/api";
import { useFormik } from "formik";
import { alertAction } from "../../redux/alert/alertAction";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AccountSettings({ id }) {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const [addressForm, setAdressForm] = useState(false);
  const [licenseForm, setLicenseForm] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editLicense, setEditLicense] = useState(false);
  const [addPracticeAddress, setAddPracticeAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
  });
  const [addLicense, setAddLicense] = useState({
    country: "",
    state: "",
    licenseNumber: "",
  });

  const conference = useSelector((state) => state.conference);
  const { newConference } = conference;
  const formik = useFormik({
    initialValues: {
      subSpeciality: "",
      profession: userData?.profession,
      country: newConference?.country || "",
    },
  });
  // console.log("userData=====", userData.practiceAddress);
  const loadCountryList = async () => {
    const url = `venues/countryList`;
    try {
      const response = await api.get(url);
      if (response) {
        setCountryList(response.data.data.countries);
        if (countryList) {
          loadStateList(
            countryList?.find(
              (country) => country.label === newConference?.country
            )?.countryId
          );
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
        setStateList(response.data.data.states);
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
        setCityList(response.data.data.cities);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const fetchSingleUser = async () => {
    try {
      let { data } = await api.get(`/users/${id}`);
      setUserData(data.data.user);
      console.log("data------", data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUserAdress = async (formData) => {
    try {
      let { data } = api.patch(`/users/${id}`, { formData });
      console.log("---------", data);
    } catch (error) {
      console.log(error);
    }
  };

  const onPracticeAdressChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAddPracticeAddress({ ...addPracticeAddress, [name]: value });
  };
  const handleAdsressSubmit = (e) => {
    e.preventDefault();
    let address = [addPracticeAddress];
    if (userData?.practiceAddress?.length > 0) {
      address = [...userData?.practiceAddress, ...address];
    }
    addUserAdress(address);
    setAdressForm(false);
  };

  const handleLicenseSubmit = (e) => {
    e.preventDefault();
    setLicenseForm(false);
  };

  useEffect(() => {
    loadCountryList();
  }, [userData._id]);

  useEffect(() => {
    if (countryList.length > 0) {
      const myCountryId = countryList.find(
        (country) => country.value === newConference?.country
      )?.countryId;
      loadStateList(myCountryId);
    }
  }, [countryList]);

  useEffect(() => {
    if (stateList.length > 0) {
      const myStateId = stateList.find(
        (state) => state.value === newConference?.state
      )?.stateId;
      loadCityList(myStateId);
    }
  }, [stateList]);

  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <>
      <div className="container pt-64">
        <div>
          <h1 className="mb-24">Basic information</h1>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="First name*"
                inputName="firstname"
                inputApiValue={userData?.firstName}
                userId={userData._id}
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="Last name*"
                inputName="lastname"
                inputApiValue={userData?.lastName}
                userId={userData._id}
              />
            </div>
          </div>
          <div>
            <SaveInput
              label="Profession*"
              inputName="profession"
              inputApiValue={userData?.profession}
              userId={userData._id}
            />
          </div>
          <div className="grid-col-2 mb-24">
            <div className="grid-1st-col">
              <SelectFormType1
                label="speciality"
                // options={userData.profession}
                name="speciality"
                onChange={(value) =>
                  formik.setFieldValue("speciality", value?.value)
                }
                placeholder="speciality"
                value={formik.values.profession}
              />
            </div>
            <div className="grid-2nd-col">
              <SelectFormType1
                label="sub-speciality"
                options={userData.specialities}
                name="subSpeciality"
                onChange={(value) =>
                  formik.setFieldValue("subSpeciality", value?.value)
                }
                placeholder="Sub-speciality"
                value={formik.values.subSpeciality}
              />
            </div>
          </div>
          <div>
            <SaveInput
              label="Mobile*"
              inputName="mobile"
              inputApiValue={userData?.mobile}
              userId={userData._id}
            />
          </div>
          <div>
            <SaveInput
              label="Email*"
              inputName="email"
              inputApiValue={userData?.email}
              userId={userData._id}
              disabled="disabled"
            />
          </div>

          <h2 className="mb-24">Practice Address</h2>
          <div className="my-24">
            <div style={{ alignSelf: "center", alignContent: "center" }}>
              <button
                onClick={() => {
                  setAdressForm(!addressForm);
                }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add practice address
              </span>
            </div>
          </div>
          {addressForm || editAddress ? (
            <form
              className="form-type-1 mb-20"
              autoComplete="off"
              onSubmit={handleAdsressSubmit}
            >
              <div className="grid-col-2">
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="adressLine1"
                      type="text"
                      name="adressLine1"
                      value={
                        editAddress
                          ? userData
                            ? userData?.practiceAddress?.addressLine1
                            : null
                          : null
                      }
                      onChange={onPracticeAdressChange}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>Address line 1*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
                  </div>
                </div>
                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="adressLine2"
                      type="text"
                      name="adressLine2"
                      value={
                        editAddress
                          ? userData
                            ? userData?.practiceAddress?.addressLine2
                            : null
                          : null
                      }
                      onChange={onPracticeAdressChange}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>Address line 2*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
                  </div>
                </div>
              </div>
              <div className="grid-col-2">
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={
                        editAddress
                          ? userData
                            ? userData?.practiceAddress?.city
                            : null
                          : null
                      }
                      onChange={onPracticeAdressChange}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>City*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
                  </div>
                </div>
                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="state/provience"
                      type="text"
                      name="state/provience"
                      value={
                        editAddress
                          ? userData
                            ? userData?.practiceAddress?.state
                            : null
                          : null
                      }
                      onChange={onPracticeAdressChange}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>State/Provience*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
                  </div>
                </div>
              </div>
              <div className="grid-col-2">
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="zip/postalcode"
                      type="text"
                      name="zip/postalcode"
                      value={
                        editAddress
                          ? userData
                            ? userData?.practiceAddress?.zipcode
                            : null
                          : null
                      }
                      onChange={onPracticeAdressChange}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>Zip/Postal code*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
                  </div>
                </div>
                <div className="grid-2nd-col">
                  <div className="grid-1st-col">
                    <SelectFormType1
                      label="country"
                      options={userData.country}
                      name="country"
                      onChange={(value) =>
                        formik.setFieldValue("country", value?.value)
                      }
                      placeholder="Country"
                      value="country"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="button button-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
          <div>
            <div className="as-pd-icons">
              <h4>Practice Address</h4>
              <span
                style={{ marginRight: "8px", marginLeft: "12px" }}
                onClick={() => {
                  setEditAddress(!editAddress);
                  console.log("edit icon is clicked");
                }}
              >
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p className="mt-20 mb-4">
              {" "}
              <span className="caption-2-regular-gray3 ">
                {userData ? userData?.practiceAddress?.addressLine1 : null}
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData.practiceAddress?.addressLine2 : null}
              </span>
            </p>
            <p className="my-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData
                  ? `${userData.practiceAddress?.city},${userData.practiceAddress?.state},${userData.practiceAddress?.zipcode}`
                  : null}
              </span>
            </p>
            <p className="my-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData?.practiceAddress?.country : null}
              </span>
            </p>
          </div>
        </div>
        <div className="my-24">
          <h1>License information</h1>
          <div className="mt-20">
            <div className="as-pd-icons">
              <h4>License 1</h4>
              <span
                style={{ marginRight: "8px", marginLeft: "12px" }}
                onClick={() => {
                  setEditLicense(!editLicense);
                }}
              >
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p className="mt-16 mb-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData?.licenses?.licenseNumber : null}
              </span>
            </p>
            <p className="mb-24">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData?.licenses?.state : null},{" "}
                {userData ? userData?.licenses?.country : null}
              </span>
            </p>
            <div style={{ alignSelf: "center" }}>
              <button
                onClick={() => {
                  setLicenseForm(!licenseForm);
                }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add external credits
              </span>
            </div>
            {licenseForm || editLicense ? (
              <form
                className="form-type-1"
                autoComplete="off"
                onSubmit={handleLicenseSubmit}
              >
                <div className="grid-col-2 mb-24 mt-24">
                  <div className="grid-1st-col">
                    <SelectFormType1
                      label="country"
                      options=""
                      onChange={(value) => {
                        if (formik.values.country !== value?.value) {
                          formik.setFieldValue("state", "");
                          formik.setFieldValue("city", "");
                        }
                        formik.setFieldValue("country", value?.value);
                        loadStateList(value?.countryId);
                      }}
                      placeholder="country"
                      value="country"
                    />
                  </div>
                  <div className="grid-2nd-col">
                    <SelectFormType1
                      label="state"
                      options=""
                      name="state"
                      // onChange={(value) =>
                      //   formik.setFieldValue("timezone", value?.value)
                      // }
                      placeholder="state"
                      value="state"
                    />
                  </div>
                </div>
                <div>
                  <div className="material-textfield">
                    <input
                      id="licensenumber"
                      type="text"
                      name="licensenumber"
                      value={
                        editLicense
                          ? userData
                            ? userData?.license[0]?.licenseNumber
                            : null
                          : null
                      }
                      onChange={(e) => {
                        setAddLicense({
                          ...addLicense,
                          licenseNumber: e.target.value,
                        });
                      }}
                      placeholder=" "
                      // disabled={!formik.values.mode.includes("venue")}
                    />
                    <label>Type license number*</label>
                  </div>
                  <div className="mb-24">
                    {/* {formik.touched.street1 &&
                      Boolean(formik.errors.street1) && (
                        <TextError>{formik.errors.street1}</TextError>
                      )} */}
                  </div>
                </div>
                <div>
                  <button className="button button-primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <h1>Social Media</h1>

          <SocialMedia
            socialMediaIcon={<FacebookBlueCircle className="icon-lg" />}
            name="facebook"
            removeName="removeFacebook"
            label="Facebook link"
            socialMediaApiValue={userData.facebook}
            organizationId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<LinkedinBlueIcon className="icon-lg" />}
            name="linkedin"
            removeName="removeLinkedin"
            label="Linkedin link"
            socialMediaApiValue={userData.linkedin}
            organizationId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<TwitterBlueIcon className="icon-lg" />}
            name="twitter"
            removeName="removeTwitter"
            label="Twitter link"
            socialMediaApiValue=""
            organizationId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<InstagramGradientIcon className="icon-lg" />}
            name="instagram"
            removeName="removeInstagram"
            label="Instagram link"
            socialMediaApiValue={userData.instagram}
            organizationId={userData._id}
          />
        </div>
      </div>
    </>
  );
}
