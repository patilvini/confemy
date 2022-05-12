import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;

export const userSelector = createSelector([selectUser], (auth) => auth.user);
