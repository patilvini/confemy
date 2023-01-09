import { USER_SETTINGS_LOADED } from "./userProfileTypes";

const initialState = {
  isLoading: true,
  isError: false,
  userProfile: null,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_SETTINGS_LOADED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userProfile: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
