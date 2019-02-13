import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as form } from 'redux-form/immutable'

import appReducer from 'containers/App/reducer';
import masterReducer from 'containers/MasterPage/reducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  global: appReducer,
  master: masterReducer,
  form,
});

export default rootReducer;
