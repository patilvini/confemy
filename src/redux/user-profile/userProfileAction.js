import { USER_PROFILE_LOADED } from "./userProfileTypes";

export const loadUserProfileAction = (data) => (dispatch) => {
  dispatch({
    type: USER_PROFILE_LOADED,
    payload: data,
  });
};
