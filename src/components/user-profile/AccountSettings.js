import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import SelectFormType1 from "../reselect/SelectFormType1";
import SaveInput from "../organization/SaveInput";
import SocialMedia from "../organization/SocialMedia";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";
import api from "../../utility/api";
import { useEffect, useState } from "react";

export default function AccountSettings({ id }) {
  const [userData, setUserData] = useState("");

  const fetchSingleUser = async () => {
    try {
      let { data } = await api.get(`/users/${id}`);
      setUserData(data.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [userData]);

  return (
    <>
      <div className="as-form-wrap">
        <div>
          <h1 className="mb-24">Basic information</h1>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="First name*"
                inputName="name"
                inputApiValue={userData?.firstName}
                organizationId=""
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="Last name*"
                inputName="name"
                inputApiValue={userData?.lastName}
                organizationId=""
              />
            </div>
          </div>
          <div>
            <SaveInput
              label="Profession*"
              inputName="name"
              inputApiValue={userData?.profession}
              organizationId=""
            />
          </div>
          <div className="grid-col-2 mb-24">
            <div className="grid-1st-col">
              <SelectFormType1
                label="speciality"
                options=""
                name="speciality"
                // onChange={(value) =>
                //   formik.setFieldValue("timezone", value?.value)
                // }
                placeholder="speciality"
                value="speciality"
              />
            </div>
            <div className="grid-2nd-col">
              <SelectFormType1
                label="speciality"
                options=""
                name="speciality"
                // onChange={(value) =>
                //   formik.setFieldValue("timezone", value?.value)
                // }
                placeholder="speciality"
                value="speciality"
              />
            </div>
          </div>
          <div>
            <SaveInput
              label="Mobile*"
              inputName="name"
              inputApiValue={userData?.mobile}
              organizationId=""
            />
          </div>
          <div>
            <SaveInput
              label="Email*"
              inputName="name"
              inputApiValue={userData?.email}
              organizationId=""
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
                inputName="name"
                inputApiValue={userData.practiceAddress[0]?.addressLine1}
                organizationId=""
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="Address line 2*"
                inputName="name"
                inputApiValue={userData.practiceAddress[0]?.addressLine2}
                organizationId=""
              />
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="City*"
                inputName="name"
                inputApiValue={userData.practiceAddress[0]?.city}
                organizationId=""
              />
            </div>
            <div className="grid-2nd-col">
              <SaveInput
                label="State/Provience*"
                inputName="name"
                inputApiValue={userData.practiceAddress[0]?.state}
                organizationId=""
              />
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <SaveInput
                label="Zip/Postal Code*"
                inputName="name"
                inputApiValue={userData.practiceAddress[0]?.zipcode}
                organizationId=""
              />
            </div>
            <div className="grid-2nd-col">
              <div className="grid-1st-col">
                <SelectFormType1
                  label="country"
                  options=""
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
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData.practiceAddress[0]?.addressLine1}
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData.practiceAddress[0]?.addressLine2}
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {`${userData.practiceAddress[0]?.city},${userData.practiceAddress[0]?.state},${userData.practiceAddress[0]?.zipcode}

`}
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                {userData.practiceAddress[0].country}
              </span>
            </p>
          </div>
        </div>
        <div className="my-24">
          <h1>License information</h1>
          <div className="">
            <div className="as-pd-icons">
              <h2>License 1</h2>
              <span style={{ marginRight: "8px", marginLeft: "12px" }}>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                License no: 3r3iwrhekjfn
              </span>
            </p>
            <p className="mb-24">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">Texas, USA</span>
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
                  name="country"
                  // onChange={(value) =>
                  //   formik.setFieldValue("timezone", value?.value)
                  // }
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
                inputApiValue={userData.licenses[0].licenseNumber}
                organizationId=""
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
            socialMediaApiValue=""
            organizationId=""
          />
          <SocialMedia
            socialMediaIcon={<LinkedinBlueIcon className="icon-lg" />}
            name="linkedin"
            removeName="removeLinkedin"
            label="Linkedin link"
            socialMediaApiValue=""
            organizationId=""
          />
          <SocialMedia
            socialMediaIcon={<TwitterBlueIcon className="icon-lg" />}
            name="twitter"
            removeName="removeTwitter"
            label="Twitter link"
            socialMediaApiValue=""
            organizationId=""
          />
          <SocialMedia
            socialMediaIcon={<InstagramGradientIcon className="icon-lg" />}
            name="instagram"
            removeName="removeInstagram"
            label="Instagram link"
            socialMediaApiValue=""
            organizationId=""
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
