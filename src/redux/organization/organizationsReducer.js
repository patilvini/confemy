import {
  ORGANIZATIONS_LOADED,
  ERROR_LOADING_ORGANIZATIONS,
} from "./organizationsTypes";

const initialState = {
  isLoading: true,
  isError: false,
  myOrganizations: [],
};

export default function organizationsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORGANIZATIONS_LOADED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        myOrganizations: payload,
      };

    case ERROR_LOADING_ORGANIZATIONS:
      return {
        ...state,
        isLoading: false,
        isError: true,
        myOrganizations: [],
      };

    default:
      return {
        ...state,
      };
  }
}
