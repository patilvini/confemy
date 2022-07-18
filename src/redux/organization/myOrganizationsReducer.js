import {
  MYORGANIZATIONS_LOADED,
  MYORGANIZATIONS_ERROR,
} from "./myOrganizationsTypes";

const initialState = {
  isLoading: true,
  isError: false,
  organizations: null,
};

export default function myOrganizationsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MYORGANIZATIONS_LOADED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        organizations: payload,
      };

    case MYORGANIZATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        organizations: null,
      };

    default:
      return {
        ...state,
      };
  }
}
