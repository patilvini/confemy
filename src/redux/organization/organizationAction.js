import { ORGANIZATION_LOADED, ORGANIZATION_ERROR } from "./organizationTypes";

export const loadOrganizationAction = (data) => (dispatch) => {
  dispatch({
    type: ORGANIZATION_LOADED,
    payload: data,
  });
};

export const organizationErrorAction = () => (dispatch) => {
  dispatch({
    type: ORGANIZATION_ERROR,
  });
};
