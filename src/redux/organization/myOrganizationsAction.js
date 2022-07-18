import {
  MYORGANIZATIONS_LOADED,
  MYORGANIZATIONS_ERROR,
} from "./myOrganizationsTypes";

export const loadMyOrganizationsAction = (data) => (dispatch) => {
  dispatch({
    type: MYORGANIZATIONS_LOADED,
    payload: data,
  });
};

export const myOrganizationsErrorAction = () => (dispatch) => {
  dispatch({
    type: MYORGANIZATIONS_ERROR,
  });
};
