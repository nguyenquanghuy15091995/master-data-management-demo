const PREFIX = 'global';

export const SET_SIDEBAR_OPEN = `${PREFIX}/SET_SIDEBAR_OPEN`;
export const SET_CURRENT_MASTER = `${PREFIX}/SET_CURRENT_MASTER`;

export const UPDATE_MASTER_ITEM = `${PREFIX}/UPDATE_MASTER_ITEM`;

export function checkPage(url, condition) {
  const arr = url.split('/');
  const isPage = arr.find(element => `/${element}` === condition);
  return isPage !== undefined;
}