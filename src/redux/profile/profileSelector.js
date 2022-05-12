import { createSelector } from 'reselect';

const selectProfile = (state) => state.profile;

export const profileSelector = createSelector(
  [selectProfile],
  (profile) => profile.profile
);
