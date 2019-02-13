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

export const makeSelectMasterListActive = () => createSelector(selectGlobal, masterListState =>
  masterListState.get('masterList').toJS().filter(element => element.active),
);

export const makeSelectMasterListInactive = () => createSelector(selectGlobal, masterListState =>
  masterListState.get('masterList').toJS().filter(element => !element.active),
);

export const makeSelectCurrentMaster = () => createSelector(selectGlobal, masterState =>
  masterState.get('currentMaster') !== null && masterState.get('currentMaster') !== undefined ? masterState.get('currentMaster').toJS() : null,
);

export const makeSelectCurrentObject = () => createSelector(selectGlobal, objectState =>
  objectState.get('currentObject') !== null && objectState.get('currentObject') !== undefined ? objectState.get('currentObject').toJS() : null,
);
