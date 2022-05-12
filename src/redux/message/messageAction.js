import { SHOW_MESSAGE } from './messageTypes';

export const messageAction = (msg) => ({
  type: SHOW_MESSAGE,
  payload: msg,
});
