import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import App from 'containers/App';

import rootReducer from './reducers';
import configStore from './configure-store';
import * as serviceWorker from './serviceWorker';
import './index.css';

const history = createBrowserHistory();

const store = configStore(history);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root')
  )
}

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('containers/App', () => {
    render();
  });

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer(history))
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
