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

  const conference = useSelector((state) => state.conference);
  const { newConference } = conference;
  const formik = useFormik({
    initialValues: {
      subSpeciality: "",
      profession: userData?.profession,
      country: newConference?.country || "",
    },
  });

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
      setUserData(data.data.user[0]);
      console.log("=======", data);
    } catch (error) {
      console.log(error);
    }
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
      <div className="as-form-wrap">
        <div>
          <h1 className="mb-24">Basic information</h1>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="First name*"
                inputName="firstname"
                inputApiValue={userData?.firstName}
                userId={userData._id}
                disabled="disabled"
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="Last name*"
                inputName="lastname"
                inputApiValue={userData?.lastName}
                organizationId={userData._id}
                disabled="disabled"
              />
            </div>
          </div>
          <div>
            <SaveInput
              label="Profession*"
              inputName="profession"
              inputApiValue={userData?.profession}
              organizationId={userData._id}
              disabled="disabled"
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
              organizationId={userData._id}
              disabled="disabled"
            />
          </div>
          <div>
            <SaveInput
              label="Email*"
              inputName="email"
              inputApiValue={userData?.email}
              organizationId={userData._id}
              disabled="disabled"
            />
          </div>
          <div className="my-24">
            <div style={{ alignSelf: "center" }}>
              <button
                // onClick={() => {
                //   setExternalOpen(true);
                // }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add external credits
              </span>
            </div>
          </div>

          <h2 className="mb-24">Practice Address</h2>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="Address line 1*"
                inputName="addressLine1"
                inputApiValue={
                  userData ? userData?.practiceAddress[0]?.addressLine1 : null
                }
                userId={userData?._id}
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="Address line 2*"
                inputName="addressLine2"
                inputApiValue={
                  userData ? userData?.practiceAddress[0]?.addressLine2 : null
                }
                userId={userData?._id}
              />
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="City*"
                inputName="city"
                inputApiValue={
                  userData ? userData.practiceAddress[0]?.city : null
                }
                userId={userData._id}
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="State/Provience*"
                inputName="state/provience"
                inputApiValue={
                  userData ? userData.practiceAddress[0]?.state : null
                }
                userId={userData._id}
              />
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="Zip/Postal Code*"
                inputName="name"
                inputApiValue={
                  userData ? userData.practiceAddress[0]?.zipcode : null
                }
                userId={userData._id}
              />
            </div>
            <div className="grid-2nd-col">
              <div className="grid-1st-col">
                <SelectFormType1
                  label="country"
                  options={userData.country}
                  name="country"
                  // onChange={(value) =>
                  //   formik.setFieldValue("timezone", value?.value)
                  // }
                  placeholder="Country"
                  value="country"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="as-pd-icons">
              <h2>Practice Address</h2>
              <span style={{ marginRight: "8px", marginLeft: "12px" }}>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p className="mt-20 mb-4">
              {" "}
              <span className="caption-2-regular-gray3 ">
                Address line 1 :
                {userData ? userData?.practiceAddress[0]?.addressLine1 : null}
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                Address line 2 :{" "}
                {userData ? userData.practiceAddress[0]?.addressLine2 : null}
              </span>
            </p>
            <p className="my-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData
                  ? `${userData.practiceAddress[0]?.city},${userData.practiceAddress[0]?.state},${userData.practiceAddress[0]?.zipcode}`
                  : null}
              </span>
            </p>
            <p className="my-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData.practiceAddress[0].country : null}
              </span>
            </p>
          </div>
        </div>
        <div className="my-24">
          <h1>License information</h1>
          <div className="mt-20">
            <div className="as-pd-icons">
              <h2>License 1</h2>
              <span style={{ marginRight: "8px", marginLeft: "12px" }}>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p className="mt-16 mb-4">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                License no:{" "}
                {userData ? userData?.licenses[0]?.licenseNumber : null}
              </span>
            </p>
            <p className="mb-24">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData ? userData?.licenses[0]?.state : null},{" "}
                {userData ? userData?.licenses[0]?.country : null}
              </span>
            </p>
            <div style={{ alignSelf: "center" }}>
              <button
                // onClick={() => {
                //   setExternalOpen(true);
                // }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add external credits
              </span>
            </div>
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
              <SaveInput
                label="Type license number*"
                inputName="name"
                inputApiValue={
                  userData ? userData?.licenses[0]?.licenseNumber : null
                }
                userId={userData._id}
              />
            </div>
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
      <div className="as-footer">
        <div className="as-form-wrap social-display-grid">
          <button className="button button-primary">Save</button>
        </div>
      </div>
    </>
  );
}
