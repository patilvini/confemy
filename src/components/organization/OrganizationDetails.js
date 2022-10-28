import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utility/api";
import SaveInput from "./SaveInput";
import LogoUploader from "./LogoUploader";
import SocialMedia from "./SocialMedia";
import Spinner from "../spinner/Spinner";

import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";

import AddOrganizer from "./AddOrganizer";
import ShowOrganizers from "./ShowOrganizers";
import Dialogue from "../dialogue/Dialogue";

import { loadOrganization } from "./organizationUtil";
import { removeOrganizationAction } from "../../redux/organization/organizationAction";
import { store } from "../../redux/store";
import "./organizationDetails.styles.scss";

export default function OrganizationDetails() {
  const [open, setopen] = useState(false);

  const { organizationId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { organization } = useSelector((state) => state.organization);
  const navigate = useNavigate();

  const yesAction = async () => {
    const url = `organizations/${organizationId}/users/${user?._id}`;
    const response = await api.delete(url);
    if (response) {
      setopen(false);
      navigate("/dashboard/my-organizations");
    }
  };

  const openDialogue = () => {
    setopen(true);
  };
  const closeDialogue = () => {
    setopen(false);
  };

  useEffect(() => {
    loadOrganization(organizationId, user._id);
    return () => store.dispatch(removeOrganizationAction());
  }, [organizationId, user._id]);

  return (
    <>
      {organization ? (
        <div className="create-org-wrap">
          <section className="mb-60">
            <LogoUploader
              apiLogo={organization?.logo}
              organizationId={organizationId}
            />
          </section>
          <section>
            <SaveInput
              label="Organization name*"
              inputName="name"
              inputApiValue={organization?.name}
              organizationId={organizationId}
            />
            <SaveInput
              label="City*"
              inputName="city"
              inputApiValue={organization?.city}
              organizationId={organizationId}
            />
            <SaveInput
              label="Country*"
              inputName="country"
              inputApiValue={organization?.country}
              organizationId={organizationId}
            />
            <SaveInput
              label="Website"
              inputName="website"
              inputApiValue={organization?.website}
              organizationId={organizationId}
            />
          </section>

          <section>
            <h2 className="mb-10 mt-56">Organisers</h2>
            <p className="mb-40 caption-1-regular-gray3">
              Organisers can review, edit or publish conferences.
            </p>
            <AddOrganizer organizationId={organizationId} />
            <ShowOrganizers
              organizers={organization?.organizers}
              organizationId={organizationId}
            />
          </section>

          <section>
            <h2 className="mb-10 mt-56">Social Media</h2>
            <p className="caption-1-regular-gray3">
              Connect your social media accounts for better reachability.
            </p>
            <SocialMedia
              socialMediaIcon={<FacebookBlueCircle className="icon-lg" />}
              name="facebook"
              removeName="removeFacebook"
              label="Facebook link"
              socialMediaApiValue={organization?.facebook}
              organizationId={organizationId}
            />
            <SocialMedia
              socialMediaIcon={<LinkedinBlueIcon className="icon-lg" />}
              name="linkedin"
              removeName="removeLinkedin"
              label="Linkedin link"
              socialMediaApiValue={organization?.linkedin}
              organizationId={organizationId}
            />
            <SocialMedia
              socialMediaIcon={<TwitterBlueIcon className="icon-lg" />}
              name="twitter"
              removeName="removeTwitter"
              label="Twitter link"
              socialMediaApiValue={organization?.twitter}
              organizationId={organizationId}
            />
            <SocialMedia
              socialMediaIcon={<InstagramGradientIcon className="icon-lg" />}
              name="instagram"
              removeName="removeInstagram"
              label="Instagram link"
              socialMediaApiValue={organization?.instagram}
              organizationId={organizationId}
            />
          </section>
          <h2 className="mt-80 mb-16">Danger Zone</h2>
          <section className="delete-organization-wrap">
            <div style={{ flexGrow: 1 }}>
              <h4 className="mb-4">Delete this organization</h4>
              <p className="caption-1-regular-gray3">
                Once you delete the organization, it can not be recovered.
              </p>
            </div>
            <button
              onClick={openDialogue}
              className="button-text button-text-red"
            >
              Delete
            </button>
          </section>
          {open && (
            <Dialogue
              msg="Are you sure you want to delete the organization?"
              title="Confirm Delete !!"
              closeDialogue={closeDialogue}
              yesAction={yesAction}
            />
          )}
        </div>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
}
