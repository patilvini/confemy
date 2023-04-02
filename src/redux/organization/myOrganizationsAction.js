import {
  MYORGANIZATIONS_LOADED,
  MYORGANIZATIONS_ERROR,
  MYORGANIZATIONS_SELECTLIST_LOADED,
} from "./myOrganizationsTypes";

export const loadMyOrganizationsAction = (data) => (dispatch) => {
  dispatch({
    type: MYORGANIZATIONS_LOADED,
    payload: data,
  });
};

export const loadMyOrganizationsSelectListAction = (data) => (dispatch) => {
  dispatch({
    type: MYORGANIZATIONS_SELECTLIST_LOADED,
    payload: data,
  });
};

export const myOrganizationsErrorAction = () => (dispatch) => {
  dispatch({
    type: MYORGANIZATIONS_ERROR,
  });
};
