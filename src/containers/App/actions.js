import {
  SET_SIDEBAR_OPEN,
  UPDATE_MASTER_ITEM,
  CREATE_MASTER_ITEM,
} from './constants';

export function setSidebarOpen(openStatus) {
  return {
    type: SET_SIDEBAR_OPEN,
    open: openStatus,
  };
}

export function updateMasterItem(item) {
  return {
    type: UPDATE_MASTER_ITEM,
    masterItem: item,
  };
}

export function createMasterItem(item) {
  return {
    type: CREATE_MASTER_ITEM,
    masterItem: item,
  };
}
