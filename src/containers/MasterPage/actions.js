import {
  SET_MASTER_LIST_STATE,
} from './constants';

export function setMasterListState(state) {
  return {
    type: SET_MASTER_LIST_STATE,
    listState: state,
  }
}
