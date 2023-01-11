import { USER_PROFILE_LOADED } from "./userProfileTypes";

const initialState = {
  isLoading: true,
  isError: false,
  userProfile: null,
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
    default:
      return {
        ...state,
      };
  }
}
