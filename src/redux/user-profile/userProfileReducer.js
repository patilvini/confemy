import {
  USER_PROFILE_LOADED,
  GET_USER_EXTERNAL_CREDITS,
  GET_USER_SINGELE_EXTERNAL_CREDIT,
  CLEAR_USER_SINGELE_EXTERNAL_CREDIT,
  GET_USER_CREDIT_CONFERENCES,
  USER_TOTAL_CREDITS,
} from "./userProfileTypes";

const initialState = {
  isLoading: true,
  isError: false,
  userProfile: null,
  userExternalCredits: [],
  userSingleExternalCredit: null,
  userCreditConferences: null,
  userTotalCredits: {},
};

export default function userProfileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userProfile: payload,
      };
    case GET_USER_EXTERNAL_CREDITS:
      return {
        ...state,
        userExternalCredits: payload,
      };
    case GET_USER_SINGELE_EXTERNAL_CREDIT:
      return {
        ...state,
        userSingleExternalCredit: payload,
      };
    case CLEAR_USER_SINGELE_EXTERNAL_CREDIT:
      return {
        ...state,
        userSingleExternalCredit: null,
      };
    case GET_USER_CREDIT_CONFERENCES:
      return {
        ...state,
        userCreditConferences: payload,
      };
    case USER_TOTAL_CREDITS:
      return {
        ...state,
        userTotalCredits: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
