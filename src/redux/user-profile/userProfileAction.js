import {
  USER_PROFILE_LOADED,
  GET_USER_EXTERNAL_CREDITS,
  GET_USER_SINGELE_EXTERNAL_CREDIT,
  CLEAR_USER_SINGELE_EXTERNAL_CREDIT,
  GET_USER_CREDIT_CONFERENCES,
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

export const loadUserSingleExternalCreditAction = (data) => (dispatch) => {
  dispatch({
    type: GET_USER_SINGELE_EXTERNAL_CREDIT,
    payload: data,
  });
};

export const clearUserSingleExternalCreditAction = () => ({
  type: CLEAR_USER_SINGELE_EXTERNAL_CREDIT,
});

export const loadUserCreditConferencesAction = (data) => (dispatch) => {
  dispatch({
    type: GET_USER_CREDIT_CONFERENCES,
    payload: data,
  });
};
