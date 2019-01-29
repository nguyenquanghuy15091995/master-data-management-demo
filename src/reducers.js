import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as form } from 'redux-form/immutable'

import appReducer from 'containers/App/reducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  global: appReducer,
  form,
});

export default rootReducer;
