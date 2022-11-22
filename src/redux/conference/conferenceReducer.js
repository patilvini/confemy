import {
  CREATE_CONFERENCE,
  REMOVE_NEWCONF_STATE,
  LOAD_INCOMPLETE_CONFS,
  LOAD_INCOMPLETE_CONF,
  LOAD_ALL_MY_CONFS,
  SEARCH_CONFS,
} from "./conferenceTypes";

const initialState = {
  isLoading: true,
  newConference: {},
  incompleteConfs: null,
  myConfs: null,
  error: false,
  search: {
    isLoading: true,
    error: false,
    result: [],
  },
};

function conferenceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CONFERENCE:
    case LOAD_INCOMPLETE_CONF:
      return {
        ...state,
        isLoading: false,
        newConference: payload,
        error: false,
      };

    case REMOVE_NEWCONF_STATE:
      return {
        ...state,
        isLoading: true,
        newConference: {},
        error: false,
      };

    case LOAD_INCOMPLETE_CONFS:
      return {
        ...state,
        incompleteConfs: payload,
      };

    case LOAD_ALL_MY_CONFS:
      return {
        ...state,
        myConfs: payload,
      };

    case SEARCH_CONFS:
      return {
        ...state,
        search: {
          isLoading: false,
          error: false,
          result: payload,
        },
      };
    default:
      return state;
  }
}

export default conferenceReducer;
