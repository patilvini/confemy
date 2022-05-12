import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './profileTypes';
import { alertAction } from '../alert/alertAction';

// get attendee profile

export const getProfileAction = (organizer) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'GET',
      withCredentials: true,
      url: organizer
        ? 'http://localhost:5000/api/organizer-profile/me'
        : 'http://localhost:5000/api/attendee-profile/me',
    });
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create attendee profile

export const createProfileAction = (
  formData,
  history,
  organizer,
  edit
) => async (dispatch) => {
  try {
    await axios({
      method: edit ? 'PUT' : 'POST',
      data: formData,
      withCredentials: true,
      url: organizer
        ? 'http://localhost:5000/api/organizer-profile'
        : 'http://localhost:5000/api/attendee-profile',
    });
    const message = edit
      ? 'Profile Updated Successfully'
      : 'Profile Created Successfully';
    dispatch(alertAction(message, 'success'));
    history.push(
      organizer ? '/organizer-dashboard/profile' : '/attendee-dashboard/profile'
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
