import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SHOW_ALERT } from "./alertTypes";
export const alertAction =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SHOW_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };
