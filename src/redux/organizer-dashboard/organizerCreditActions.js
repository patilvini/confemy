import { GET_ALL_ORGANIZER_CREDITS } from "./organizerCreditTypes";

export const loadAllOrganizerCreditsAction = (data) => (dispatch) => {
  dispatch({
    type: GET_ALL_ORGANIZER_CREDITS,
    payload: data,
  });
};
