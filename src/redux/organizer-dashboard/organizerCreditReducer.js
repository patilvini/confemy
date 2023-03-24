import { GET_ALL_ORGANIZER_CREDITS } from "./organizerCreditTypes";

const initialState = {
  allCredits: [],
};

export default function organizerCreditReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ORGANIZER_CREDITS:
      return {
        ...state,

        allCredits: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
