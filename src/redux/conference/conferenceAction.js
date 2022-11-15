import axios from "axios";
import {
  CONFERENCE_ERROR,
  GET_CONFERENCE,
  CREATE_CONFERENCE,
  REMOVE_NEWCONF_STATE,
  LOAD_INCOMPLETE_CONFS,
  LOAD_INCOMPLETE_CONF,
  LOAD_ALL_MY_CONFS,
} from "./conferenceTypes";

// Creat a conference
export const createConferenceAction = (data) => (dispatch) => {
  dispatch({
    type: CREATE_CONFERENCE,
    payload: data,
  });
};

// remove new conference redux state
export const removeConferenceStateAction = () => (dispatch) => {
  dispatch({
    type: REMOVE_NEWCONF_STATE,
  });
};

//  load one incomplete conference
export const loadOneIncopleteConfAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_INCOMPLETE_CONF,
    payload: data,
  });
};
//  load all incomplete conferences

export const loadIncopleteConfsAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_INCOMPLETE_CONFS,
    payload: data,
  });
};
export const loadAllMyConfsAction = (data) => (dispatch) => {
  dispatch({
    type: LOAD_ALL_MY_CONFS,
    payload: data,
  });
};

// get a conference

export const getConferenceAction = () => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/conferences/:conference_id",
    });
    dispatch({ type: GET_CONFERENCE, payload: res.data });
  } catch (err) {
    dispatch({
      type: CONFERENCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
