import { GET_PROFILE, PROFILE_ERROR, REMOVE_PROFILE } from './profileTypes';
const initialState = {
  isLoading: true,
  profile: null,
  errors: {},
};
function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        isLoading: false,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
export default profileReducer;
