import { fromJS } from 'immutable';

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

const initState = fromJS({
  sidebarOpen: false,
  masterList: [
    {
      id: 1, name: 'Test 1', icon: 'thumb_up', status: 'ENABLE', url: '/test-1', description: 'test test test', active: true, attributes: [
        { id: 1, name: 'col 1', code: 'col1', type: 'text', description: 'col 1 col 1', status: 'ENABLE', required: true },
        { id: 2, name: 'col 2', code: 'col2', type: 'number', description: 'col 2 col 2', status: 'ENABLE', required: true },
        { id: 3, name: 'col 3', code: 'col3', type: 'text', description: 'col 3 col 3', status: 'ENABLE', required: true },
      ]
    },
    {
      id: 2, name: 'Test 2', icon: 'thumb_up', status: 'ENABLE', url: '/test-2', description: 'test test test', active: true, attributes: [
        { id: 1, name: 'col 1', code: 'col1', type: 'text', description: 'col 1 col 1', status: 'ENABLE', required: true },
        { id: 2, name: 'col 2', code: 'col2', type: 'number', description: 'col 2 col 2', status: 'ENABLE', required: true },
        { id: 3, name: 'col 3', code: 'col3', type: 'text', description: 'col 3 col 3', status: 'ENABLE', required: true },
        { id: 4, name: 'col 4', code: 'col4', type: 'text', description: 'col 4 col 4', status: 'ENABLE', required: true },
      ]
    },
  ],
  currentMaster: null,
  objectData: [
    {
      id: 1,
      masterId: 1,
      data: [
        { id: 1, col1: 'aaa', col2: 'bbb', col3: 'ccc' },
        { id: 2, col1: 'aaa', col2: 'bbb', col3: 'ccc' },
        { id: 3, col1: 'aaa', col2: 'bbb', col3: 'ccc' },
      ],
    },
    {
      id: 2,
      masterId: 2,
      data: [
        { id: 1, col1: 'aaa', col2: 'bbb', col3: 'ccc', col4: 'ddd' },
        { id: 2, col1: 'aaa', col2: 'bbb', col3: 'ccc', col4: 'ddd' },
        { id: 3, col1: 'aaa', col2: 'bbb', col3: 'ccc', col4: 'ddd' },
      ],
    },
  ],
  currentObject: null,
});

function appReducer(state = initState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPEN: {
      return state.set('sidebarOpen', action.open);
    }
    case SET_CURRENT_MASTER: {
      const currentMaster = state.get('masterList').toJS().find(element => ('' + element.id) === ('' + action.masterId));
      return state.set('currentMaster', currentMaster ? fromJS(currentMaster) : null);
    }
    case UPDATE_MASTER_ITEM: {
      let list = state.get('masterList').slice();
      const index = list.findIndex(i => ('' + i.id) === ('' + action.masterItem.get('id'))
        || ('' + i.get('id')) === ('' + action.masterItem.get('id')));
      list = fromJS(Object.assign(state.get('masterList').slice().toJS(), list, { [`${index}`]: action.masterItem }));
      return state.set('masterList', list)
        .set('currentMaster', action.masterItem);
    }
    case CREATE_MASTER_ITEM: {
      const listAdd = state.get('masterList').push(action.masterItem);
      const listObjectCreate = state.get('objectData').push(fromJS({
        id: Date.now(),
        masterId: action.masterItem.id,
        data: [],
      }));
      return state.set('masterList', listAdd)
        .set('objectData', listObjectCreate);
    }
    case DELETE_MASTER_ITEM: {
      let list = state.get('masterList').slice();
      const index = list.findIndex(i => ('' + i.id) === ('' + action.masterId)
        || ('' + i.get('id')) === ('' + action.masterId));
      list = list.update(index, (item) => item.set('active', false));
      return state.set('masterList', list)
        .set('currentMaster', list.get(index));
    }
    case RESTORE_MASTER_ITEM: {
      let list = state.get('masterList').slice();
      const index = list.findIndex(i => ('' + i.id) === ('' + action.masterId)
        || ('' + i.get('id')) === ('' + action.masterId));
      list = list.update(index, (item) => item.set('active', true));
      return state.set('masterList', list)
        .set('currentMaster', list.get(index));
    }
    case SET_CURRENT_OBJECT: {
      const currObject = state.get('objectData').toJS().find(element => ('' + element.masterId) === ('' + action.masterId));
      return state.set('currentObject', fromJS(currObject));
    }
    case CREATE_OBJECT_DATA: {
      let list = state.get('objectData').slice();
      const index = list.findIndex(i => ('' + i.masterId) === ('' + action.masterId)
        || ('' + i.get('masterId')) === ('' + action.masterId));
      list = list.update(index, (item) => item.set('data', item.get('data').push(fromJS(action.objectData))));
      return state.set('objectData', list);
    }
    case UPDATE_OBJECT_DATA: {
      let list = state.get('objectData').slice();
      const index = list.findIndex(i => ('' + i.id) === ('' + action.objectId)
        || ('' + i.get('id')) === ('' + action.objectId));
      list = list.update(index, (item) => {
        let dataTemp = item.get('data').slice();
        const dataIndex = dataTemp.findIndex(e => ('' + e.id) === ('' + action.currData.get('id'))
          || ('' + e.get('id')) === ('' + action.currData.get('id')));
        dataTemp = dataTemp.update(dataIndex, () => action.currData);
        return item.set('data', dataTemp);
      });
      return state.set('objectData', list)
        .set('currentObject', list.get(index));
    }
    case DELETE_OBJECT_DATA: {
      let list = state.get('objectData').slice();
      const index = list.findIndex(i => ('' + i.id) === ('' + action.objectId)
        || ('' + i.get('id')) === ('' + action.objectId));
      list = list.update(index, (item) => {
        const dataTemp = item.get('data').slice();
        return item.set('data', dataTemp.filter((element) => '' + element.get('id') !== '' + action.dataId));
      });
      return state.set('objectData', list)
        .set('currentObject', list.get(index));
    }
    default:
      return state;
  }
}

export default appReducer;
