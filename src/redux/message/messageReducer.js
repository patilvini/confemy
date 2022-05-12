import { SHOW_MESSAGE } from './messageTypes';
const INITIAL_STATE = {
  msg: '',
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
