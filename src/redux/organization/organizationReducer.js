import { ORGANIZATION_LOADED, ORGANIZATION_ERROR } from "./organizationTypes";

const initialState = {
  isLoading: true,
  isError: false,
  organization: null,
};

export default function organizationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORGANIZATION_LOADED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        organization: payload,
      };

    case ORGANIZATION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        organization: null,
      };

    default:
      return {
        ...state,
      };
  }
}
