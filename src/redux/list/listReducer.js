import { LOAD_COUNTRYLIST, LOAD_STATELIST, LOAD_CITYLIST } from "./listyTypes";
const INITIAL_STATE = {
  countryList: [],
  stateList: [],
  cityList: [],
};

const listReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_COUNTRYLIST:
      return {
        ...state,
        countryList: action.payload,
      };
    case LOAD_STATELIST:
      return {
        ...state,
        stateList: action.payload,
      };
    case LOAD_CITYLIST:
      return {
        ...state,
        cityList: action.payload,
      };

    default:
      return state;
  }
};

export default listReducer;
