import {
  ORGANIZATIONS_LOADED,
  ERROR_LOADING_ORGANIZATIONS,
} from "./organizationsTypes";

export const loadOrganizationsAction = (data) => (dispatch) => {
  dispatch({
    type: ORGANIZATIONS_LOADED,
    payload: data,
  });
};

export const errorLoadingOrganizationsAction = () => (dispatch) => {
  dispatch({
    type: ERROR_LOADING_ORGANIZATIONS,
  });
};
