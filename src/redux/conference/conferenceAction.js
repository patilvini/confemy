import axios from "axios";
import {
  CONFERENCE_ERROR,
  GET_CONFERENCE,
  CREATE_CONFERENCE,
} from "./conferenceTypes";

// Creat a conference
export const createConferenceAction = (data) => (dispatch) => {
  dispatch({
    type: CREATE_CONFERENCE,
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
