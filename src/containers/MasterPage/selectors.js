import { createSelector } from 'reselect';

const selectMaster = (state) => state.get('master');

export const makeSelectListState = () => createSelector(selectMaster, listState =>
  listState.get('listState'),
);
