import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import SocialMedia from "./SocilaMedia";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";
import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import BasicProfileInfo from "./BasicProfileInfo";
import PracticeAddressForm from "./PracticeAddressForm";

export default function AccountSettings({ id }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
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

  const {
    auth: { user },
    conference,
  } = useSelector((state) => state);

  // const loadCountryList = async () => {
  //   const url = `venues/countryList`;
  //   try {
  //     const response = await api.get(url);
  //     if (response) {
  //       setCountryList(response.data.data.countries);
  //       if (countryList) {
  //         loadStateList(
  //           countryList?.find(
  //             (country) => country.label === newConference?.country
  //           )?.countryId
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     dispatch(alertAction(err.response.data.message, "danger"));
  //   }
  // };

  // const loadStateList = async (countryId) => {
  //   const url = `venues/stateList?countryId=${countryId}`;
  //   try {
  //     const response = await api.get(url);
  //     if (response) {
  //       setStateList(response.data.data.states);
  //     }
  //   } catch (err) {
  //     dispatch(alertAction(err.response.data.message, "danger"));
  //   }
  // };

  // const loadCityList = async (stateId) => {
  //   const url = `venues/cityList?stateId=${stateId}`;
  //   try {
  //     const response = await api.get(url);
  //     if (response) {
  //       setCityList(response.data.data.cities);
  //     }
  //   } catch (err) {
  //     dispatch(alertAction(err.response.data.message, "danger"));
  //   }
  // };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
      }
      // setUserData(data.data.user);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  // const addUserAdress = async (formData) => {
  //   try {
  //     let { data } = api.patch(`/users/${id}`, { formData });
  //     console.log("---------", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onPracticeAdressChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAddPracticeAddress({ ...addPracticeAddress, [name]: value });
  };
  const handleAdsressSubmit = async (e) => {
    e.preventDefault();
    let address = [addPracticeAddress];
    if (userData?.practiceAddress?.length > 0) {
      address = [...userData?.practiceAddress, ...address];
    }

    const formData = {
      user: {
        practiceAddress: address,
      },
    };
    try {
      const response = await api.patch(`/users/${id}`, formData);
      console.log("address submit response", response);
      setAdressForm(false);
      setUserData(response.data.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLicenseSubmit = (e) => {
    e.preventDefault();
    setLicenseForm(false);
  };

  // useEffect(() => {
  //   loadCountryList();
  // }, [userData._id]);

  // useEffect(() => {
  //   if (countryList.length > 0) {
  //     const myCountryId = countryList.find(
  //       (country) => country.value === newConference?.country
  //     )?.countryId;
  //     loadStateList(myCountryId);
  //   }
  // }, [countryList]);

  // useEffect(() => {
  //   if (stateList.length > 0) {
  //     const myStateId = stateList.find(
  //       (state) => state.value === newConference?.state
  //     )?.stateId;
  //     loadCityList(myStateId);
  //   }
  // }, [stateList]);

  useEffect(() => {
    fetchUserProfile(user._id);
  }, [user._id]);

  return (
    <>
      <div className="container pt-64">
        <div>
          <BasicProfileInfo />
          <h2 className="mb-24">Practice Address</h2>
          <div className={showAddressForm ? "display-none" : "my-24"}>
            <div style={{ alignSelf: "center", alignContent: "center" }}>
              <button
                onClick={() => {
                  setShowAddressForm(true);
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
          {showAddressForm && (
            <PracticeAddressForm setShowAddressForm={setShowAddressForm} />
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
            userId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<LinkedinBlueIcon className="icon-lg" />}
            name="linkedin"
            removeName="removeLinkedin"
            label="Linkedin link"
            socialMediaApiValue={userData.linkedin}
            userId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<TwitterBlueIcon className="icon-lg" />}
            name="twitter"
            removeName="removeTwitter"
            label="Twitter link"
            socialMediaApiValue=""
            userId={userData._id}
          />
          <SocialMedia
            socialMediaIcon={<InstagramGradientIcon className="icon-lg" />}
            name="instagram"
            removeName="removeInstagram"
            label="Instagram link"
            socialMediaApiValue={userData.instagram}
            userId={userData._id}
          />
        </div>
      </div>
    </>
  );
}
