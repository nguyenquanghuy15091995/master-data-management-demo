import {
  SET_SIDEBAR_OPEN,
  SET_CURRENT_MASTER,
  SET_CURRENT_OBJECT,
  UPDATE_MASTER_ITEM,
  CREATE_MASTER_ITEM,
  DELETE_MASTER_ITEM,
  RESTORE_MASTER_ITEM,
  CREATE_OBJECT_DATA,
  UPDATE_OBJECT_DATA,
  DELETE_OBJECT_DATA,
} from './constants';

export function setSidebarOpen(openStatus) {
  return {
    type: SET_SIDEBAR_OPEN,
    open: openStatus,
  };
}

export function setCurrentMaster(id) {
  return {
    type: SET_CURRENT_MASTER,
    masterId: id,
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

export function setCurrentObject(masterDataId) {
  return {
    type: SET_CURRENT_OBJECT,
    masterId: masterDataId,
  };
}

export function deleteMasterItem(masterDataId) {
  return {
    type: DELETE_MASTER_ITEM,
    masterId: masterDataId,
  };
}

export function restoreMasterItem(masterDataId) {
  return {
    type: RESTORE_MASTER_ITEM,
    masterId: masterDataId,
  };
}

export function createObjectData(data, id) {
  return {
    type: CREATE_OBJECT_DATA,
    objectData: data,
    masterId: id,
  };
}

export function updateObjectData(data, id) {
  return {
    type: UPDATE_OBJECT_DATA,
    currData: data,
    objectId: id,
  };
}

export function deleteObjectData(dataItemId, objectDataId) {
  return {
    type: DELETE_OBJECT_DATA,
    dataId: dataItemId,
    objectId: objectDataId,
  };
}
