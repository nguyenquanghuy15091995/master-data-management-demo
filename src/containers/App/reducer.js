import { fromJS } from 'immutable';

import {
  SET_SIDEBAR_OPEN,
  SET_CURRENT_MASTER,
  UPDATE_MASTER_ITEM,
  CREATE_MASTER_ITEM,
} from './constants';

const initState = fromJS({
  sidebarOpen: false,
  masterList: [],
  currentMaster: null,
});

function appReducer(state = initState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPEN:
      return state.set('sidebarOpen', action.open);
    case SET_CURRENT_MASTER:
      const currentMaster = state.get('masterList').toJS().find(element => ("" + element.id) === ("" + action.masterId));
      return state.set('currentMaster', currentMaster ? fromJS(currentMaster) : null);
    case UPDATE_MASTER_ITEM:
      let list = state.get('masterList').slice();
      const index = list.findIndex(i => ("" + i.id) === ("" + action.masterItem.get('id'))
        || ("" + i.get('id')) === ("" + action.masterItem.get('id')));
      list = fromJS(Object.assign([], list, { [`${index}`]: action.masterItem }));
      return state.set('masterList', list)
        .set('currentMaster', action.masterItem);
    case CREATE_MASTER_ITEM:
      const listAdd = state.get('masterList').push(action.masterItem);
      return state.set('masterList', listAdd);
    default:
      return state;
  }
}

export default appReducer;
