import { fromJS } from 'immutable';

import {
  RECORD_STATUS,
} from 'containers/App/constants';

import {
  SET_MASTER_LIST_STATE,
} from './constants';

const initState = fromJS({
  listState: RECORD_STATUS.ACTIVE,
});

function masterReducer(state = initState, action) {
  switch (action.type) {
    case SET_MASTER_LIST_STATE: {
      return state.set('listState', action.listState);
    }
    default:
      return state;
  };
}

export default masterReducer;
