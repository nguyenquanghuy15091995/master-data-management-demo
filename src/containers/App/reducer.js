import { fromJS } from 'immutable';

import {
  SET_SIDEBAR_OPEN,
  UPDATE_MASTER_ITEM,
} from './constants';

const initState = fromJS({
  sidebarOpen: false,
  masterList: [
    { id: 1, name: 'Object A', description: 'description for test function', url: '/object-a', icon: 'add_circle', status: 'ENABLE' },
    { id: 2, name: 'Object B', description: 'description for test function', url: '/object-b', icon: 'add_circle', status: 'ENABLE' },
    { id: 3, name: 'Object C', description: 'description for test function', url: '/object-c', icon: 'add_circle', status: 'DISABLE' },
  ],
});

function appReducer(state = initState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPEN:
      return state.set('sidebarOpen', action.open);
    case UPDATE_MASTER_ITEM:
      const list = state.get('masterList');
      const index = list.findIndex(i => i.id === action.masterItem.id);
      list.splice(index, 1, action.masterItem);
      return state.set('masterList', list);
    default:
      return state;
  }
}

export default appReducer;
