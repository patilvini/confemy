import {
  USER_PROFILE_LOADED,
  GET_USER_EXTERNAL_CREDITS,
  CREATE_USER_EXTERNAL_CREDITS,
} from "./userProfileTypes";

export const loadUserProfileAction = (data) => (dispatch) => {
  dispatch({
    type: USER_PROFILE_LOADED,
    payload: data,
  });
};

export const loadUserExternalCreditsAction = (data) => (dispatch) => {
  dispatch({
    type: GET_USER_EXTERNAL_CREDITS,
    payload: data,
  });
};
