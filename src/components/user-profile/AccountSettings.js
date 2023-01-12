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
import PracticeAddress from "./PracticeAddress";

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
    userProfile,
  } = useSelector((state) => state);

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

  useEffect(() => {
    fetchUserProfile(user._id);
  }, [user._id]);

  return (
    <div className="container pt-64">
      {/* basic info */}
      <div>
        <BasicProfileInfo />
      </div>
      {/* practice address */}
      <div>
        <h2 className="mb-24">Practice Address</h2>
        {showAddressForm ? (
          <PracticeAddressForm
            setShowAddressForm={setShowAddressForm}
            editMode={false}
          />
        ) : (
          <div className="flex-vc my-24">
            <button
              onClick={() => {
                setShowAddressForm(true);
              }}
              className="circle-button mr-4"
            >
              <AddIcon />
            </button>
            <p className="caption-2-regular-gray3 ml-5">Add practice address</p>
          </div>
        )}
        {userProfile?.userProfile?.practiceAddress?.map((practice, indx) => (
          <PracticeAddress practice={practice} indx={indx} />
        ))}
      </div>

      {/* License */}
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
      {/* social media */}
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
  );
}
