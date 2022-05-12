import axios from 'axios';
import { CONFERENCE_ERROR, GET_CONFERENCE } from './conferenceTypes';
import { alertAction } from '../alert/alertAction';

// Creat a conference
export const createConferenceAction = (formData, history) => async (
  dispatch
) => {
  try {
    const res = await axios({
      method: 'POST',
      data: formData,
      withCredentials: true,
      url: 'http://localhost:5000/api/conferences',
    });
    // dispatch({ type: GET_CONFERENCE, payload: res.data });
    const message = 'Conference Created Successfully';
    dispatch(alertAction(message, 'success'));
    history.push('/organizer-dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, 'danger')));
    }
    dispatch({
      type: CONFERENCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get a conference

export const getConferenceAction = () => async (dispatch) => {
  try {
    const res = await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:5000/api/conferences/:conference_id',
    });
    dispatch({ type: GET_CONFERENCE, payload: res.data });
  } catch (err) {
    dispatch({
      type: CONFERENCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
