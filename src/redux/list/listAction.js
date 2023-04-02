import {
  LOAD_STATELIST,
  LOAD_COUNTRYLIST,
  LOAD_CITYLIST,
  LOAD_CREDIT_TYPES_LIST,
} from "./listTypes";

export const loadCountryListAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_COUNTRYLIST,
    payload: data,
  });
};

export const loadStateListAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_STATELIST,
    payload: data,
  });
};

export const loadCityListAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_CITYLIST,
    payload: data,
  });
};

export const loadCreditTypesListAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_CREDIT_TYPES_LIST,
    payload: data,
  });
};
