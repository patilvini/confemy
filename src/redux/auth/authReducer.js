import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./authTypes";

const initialState = {
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        // ...payload,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };

    case LOGOUT:
    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
