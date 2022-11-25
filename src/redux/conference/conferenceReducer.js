import {
  CREATE_CONFERENCE,
  REMOVE_NEWCONF_STATE,
  LOAD_INCOMPLETE_CONFS,
  LOAD_INCOMPLETE_CONF,
  LOAD_ALL_MY_CONFS,
  CONF_SEARCH_DONE,
  CONF_SEARCH_INITIATED,
} from "./conferenceTypes";

const initialState = {
  isLoading: true,
  newConference: {},
  incompleteConfs: null,
  myConfs: null,
  error: false,
  search: {
    isLoading: false,
    error: false,
    conferences: [],
    liveStreamConfs: [],
  },
};

function conferenceReducer(state = initialState, action) {
  const { type, payload } = action;
  let searchObj = state.search;

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

    case CONF_SEARCH_INITIATED:
      return {
        ...state,
        search: {
          ...searchObj,
          isLoading: true,
        },
      };

    case CONF_SEARCH_DONE:
      return {
        ...state,
        search: {
          isLoading: false,
          error: false,
          conferences: payload?.conferences,
          liveStreamConfs: payload?.liveStreamConf,
        },
      };
    default:
      return state;
  }
}

export default conferenceReducer;

// if (isDef(data.min)) {
//   queryObj = {
//     ...queryObj,
//     basePrice: {
//       $gte: data.min,
//     },
//   };
// }

// if (isDef(data.max)) {
//   let baseP = queryObj.basePrice;
//   queryObj = {
//     ...queryObj,
//     basePrice: {
//       ...baseP,
//       $lte: data.max,
//     },
//   };
// }
