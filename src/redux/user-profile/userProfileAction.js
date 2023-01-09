import { USER_SETTINGS_LOADED } from "./userProfileTypes";

export const loadUserSettingsAction = (data) => (dispatch) => {
  dispatch({
    type: USER_SETTINGS_LOADED,
    payload: data,
  });
};
