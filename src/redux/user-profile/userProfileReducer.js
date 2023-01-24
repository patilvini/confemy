import {
  USER_PROFILE_LOADED,
  GET_USER_EXTERNAL_CREDITS,
  CREATE_USER_EXTERNAL_CREDITS,
} from "./userProfileTypes";

const initialState = {
  isLoading: true,
  isError: false,
  userProfile: null,
  userExternalCredits: [],
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
    default:
      return {
        ...state,
      };
  }
}
