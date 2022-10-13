import { CREATE_CONFERENCE } from "./conferenceTypes";

const initialState = {
  isLoading: true,
  newConference: {},
  error: false,
};

function conferenceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CONFERENCE:
      return {
        ...state,
        isLoading: false,
        newConference: payload,
        error: false,
      };

    default:
      return state;
  }
}

export default conferenceReducer;
