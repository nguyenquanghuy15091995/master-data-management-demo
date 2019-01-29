import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRouter = (state) => state.get('router');

export const makeSelectSidebarOpen = () => createSelector(selectGlobal, sidebarOpenState =>
  sidebarOpenState.get('sidebarOpen'),
);

export const makeSelectLocation = () => createSelector(selectRouter, locationState =>
  locationState.get('location').toJS(),
);

export const makeSelectMasterList = () => createSelector(selectGlobal, masterListState =>
  masterListState.get('masterList').toJS(),
);
