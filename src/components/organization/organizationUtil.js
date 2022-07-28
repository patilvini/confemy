import {
  loadOrganizationAction,
  organizationErrorAction,
} from "../../redux/organization/organizationAction";
import { store } from "../../redux/store";
import api from "../../utility/api";
import "../../utility/utility.styles.scss";

export const thumb = {
  borderRadius: 2,
  padding: 4,
  backgroundColor: "#ecf0f2",
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const thumbInner = {
  minWidth: 0,
  width: "70%",
  maxWidth: "70%",
  height: "auto",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const img = {
  border: "1px solid #fcfdfd",
  width: "100%",
  height: "auto",
  // objectFit: "cover",
};

export const loadOrganization = async (organizationId, userId) => {
  const url = `organizations/${organizationId}/users/${userId}`;
  try {
    const response = await api.get(url);
    if (response) {
      // console.log("get current organization call", response);
      store.dispatch(loadOrganizationAction(response.data.data.organization));
    }
  } catch (err) {
    if (err) {
      console.log(err);
      store.dispatch(organizationErrorAction());
    }
  }
};
