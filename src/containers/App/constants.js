const PREFIX = 'global';

export const SET_SIDEBAR_OPEN = `${PREFIX}/SET_SIDEBAR_OPEN`;
export const SET_CURRENT_MASTER = `${PREFIX}/SET_CURRENT_MASTER`;
export const SET_CURRENT_OBJECT = `${PREFIX}/SET_CURRENT_OBJECT`;

export const RESTORE_MASTER_ITEM = `${PREFIX}/RESTORE_MASTER_ITEM`;
export const DELETE_MASTER_ITEM = `${PREFIX}/DELETE_MASTER_ITEM`;
export const UPDATE_MASTER_ITEM = `${PREFIX}/UPDATE_MASTER_ITEM`;
export const CREATE_MASTER_ITEM = `${PREFIX}/CREATE_MASTER_ITEM`;

export const CREATE_OBJECT_DATA = `${PREFIX}/CREATE_OBJECT_DATA`;
export const UPDATE_OBJECT_DATA = `${PREFIX}/UPDATE_OBJECT_DATA`;
export const DELETE_OBJECT_DATA = `${PREFIX}/DELETE_OBJECT_DATA`;

export function checkPage(url, condition) {
  const arr = url.split('/');
  const isPage = arr.find(element => `/${element}` === condition);
  return isPage !== undefined;
}

export function setHeaderTitle(master) {
  if (master === null) {
    document.getElementById('page-title-01').innerHTML = '--Unknown--';
  } else {
    document.getElementById('page-title-01').innerHTML = master.name;
  }
}

export const RECORD_STATUS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
}
