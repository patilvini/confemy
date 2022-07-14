import { useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../utility/api";

export default function OrganizationDetails() {
  const { organizationId } = useParams();
  async function getOrganizationDetails() {
    const url = `organizations/${organizationId}`;
    try {
      const response = await api.get(url);
      if (response) {
        console.log("get one organization api", response);
        // dispatch(loadOrganizationsAction(response.data.data.organization));
      }
    } catch (err) {
      if (err) {
        // dispatch(errorLoadingOrganizationsAction());
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getOrganizationDetails();
  }, [organizationId]);

  return <div>get details for {organizationId};</div>;
}
