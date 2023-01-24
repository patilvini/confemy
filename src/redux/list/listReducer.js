import {
  LOAD_COUNTRYLIST,
  LOAD_STATELIST,
  LOAD_CITYLIST,
  LOAD_CREDIT_TYPES_LIST,
} from "./listTypes";
const INITIAL_STATE = {
  countryList: [],
  stateList: [],
  cityList: [],
  creditTypesList: [],
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
    case LOAD_CREDIT_TYPES_LIST:
      return {
        ...state,
        creditTypesList: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
