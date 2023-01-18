import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "../icons/AddIcon";
import SocialMedia from "./SocilaMedia";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";
import ModalX from "../modal/ModalX";

import BasicProfileInfo from "./BasicProfileInfo";
import PracticeAddressForm from "./PracticeAddressForm";
import PracticeAddress from "./PracticeAddress";
import LicenseForm from "./LicenseForm";
import License from "./License";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import "./userSettings.scss";
import UpdatePassword from "./UpdatePassword";

export default function AccountSettings() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showLicenseForm, setShowLicenseForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    auth: { user },
    userProfile,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    fetchUserProfile(user._id);
  }, [user._id]);

  return (
    <div className="as-form-wrap">
      {/* basic info */}
      <div>
        <BasicProfileInfo />
      </div>
      {/* practice address */}
      <div className="mb-48">
        <h2 className="my-24 color-primary">Practice Address</h2>
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
            <p className="caption-1-regular-gray3 ml-5">Add practice address</p>
          </div>
        )}
        {userProfile?.userProfile?.practiceAddress?.map((practice, indx) => (
          <div key={practice.name}>
            <PracticeAddress practice={practice} indx={indx} />
          </div>
        ))}
      </div>
      {/* License */}
      <div className="mb-48">
        <h2 className="mb-24 color-primary">License Information</h2>
        {showLicenseForm ? (
          <LicenseForm
            setShowLicenseForm={setShowLicenseForm}
            editMode={false}
          />
        ) : (
          <div className="flex-vc my-24">
            <button
              onClick={() => {
                setShowLicenseForm(true);
              }}
              className="circle-button mr-4"
            >
              <AddIcon />
            </button>
            <p className="caption-1-regular-gray3 ml-5">Add license</p>
          </div>
        )}
        {userProfile?.userProfile?.licenses?.map((license, indx) => (
          <div key={license.licenseNumber}>
            <License license={license} indx={indx} />
          </div>
        ))}
      </div>
      {/*Password*/}
      <div className="mb-48">
        <h2 className="my-24 color-primary">Update Password</h2>
        {showPasswordForm ? (
          <UpdatePassword setShowPasswordForm={setShowPasswordForm} />
        ) : (
          <div className="flex-vc my-24">
            <button
              onClick={() => {
                setShowPasswordForm(true);
              }}
              className="circle-button mr-4"
            >
              <AddIcon />
            </button>
            <p className="caption-1-regular-gray3 ml-5">Update Password</p>
          </div>
        )}
        {/* {userProfile?.userProfile?.licenses?.map((license, indx) => (
            <div key={license.licenseNumber}>
              <License license={license} indx={indx} />
            </div>
          ))} */}
      </div>
      {/* social media */}
      <div className="mb-48">
        <h2 className="color-primary">Add Users Social Media</h2>

        <SocialMedia
          socialMediaIcon={<FacebookBlueCircle className="icon-lg" />}
          name="facebook"
          removeName="removeFacebook"
          label="Facebook link"
          socialMediaApiValue={userProfile?.userProfile?.facebook}
          userId={userProfile?.userProfile?._id}
        />
        <SocialMedia
          socialMediaIcon={<LinkedinBlueIcon className="icon-lg" />}
          name="linkedin"
          removeName="removeLinkedin"
          label="Linkedin link"
          socialMediaApiValue={userProfile?.userProfile?.linkedin}
          userId={userProfile?.userProfile?._id}
        />
        <SocialMedia
          socialMediaIcon={<TwitterBlueIcon className="icon-lg" />}
          name="twitter"
          removeName="removeTwitter"
          label="Twitter link"
          socialMediaApiValue={userProfile?.userProfile?.twitter}
          userId={userProfile?.userProfile?._id}
        />
        <SocialMedia
          socialMediaIcon={<InstagramGradientIcon className="icon-lg" />}
          name="instagram"
          removeName="removeInstagram"
          label="Instagram link"
          socialMediaApiValue={userProfile?.userProfile?.instagram}
          userId={userProfile?.userProfile?._id}
        />
      </div>
    </div>
  );
}
