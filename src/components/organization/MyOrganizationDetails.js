import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../utility/api";
import SaveInput from "./SaveInput";
import LogoUploader from "./LogoUploader";

export default function MyOrganizationDetails() {
  const [organization, setOrganization] = useState(null);
  const [organizaitonLogo, setOrganizaitonLogo] = useState([]);
  const { organizationId } = useParams();

  const getCurrentOrganization = useCallback(async (id) => {
    const url = `organizations/${id}`;
    try {
      const response = await api.get(url);
      if (response) {
        console.log("get current organization call", response);
        setOrganization(response.data.data.organization);
        if (response.data.data.organization.logo)
          setOrganizaitonLogo(response.data.data.organization.logo);
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    getCurrentOrganization(organizationId);
  }, [organizationId, getCurrentOrganization]);

  console.log("organization from MyOrgDetails ", organization);

  return (
    <div className="create-org-wrap">
      <LogoUploader apiLogoArray={organizaitonLogo} />
      <SaveInput
        label="Organization name*"
        textName="name"
        inputApiValue={organization?.name}
      />
      <SaveInput
        label="City*"
        textName="city"
        inputApiValue={organization?.city}
      />
      <SaveInput
        label="Country*"
        textName="country"
        inputApiValue={organization?.country}
      />
      <SaveInput
        label="Website"
        textName="website"
        inputApiValue={organization?.website}
      />
    </div>
  );
}
