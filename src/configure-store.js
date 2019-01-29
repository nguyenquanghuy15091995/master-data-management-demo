import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router/immutable';
import Immutable from 'immutable';
import rootReducer from './reducers';

const initialState = Immutable.Map();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configStore = (history) => createStore(
  rootReducer(history),
  initialState,
  composeEnhancer(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);

export default configStore;
