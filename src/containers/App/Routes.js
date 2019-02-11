import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ConnectedRouter } from 'connected-react-router/immutable';

import HomePage from 'containers/HomePage';
import { MasterListPage, MasterCreatePage, MasterDetailPage } from 'containers/MasterPage';
import { ObjectList } from 'containers/ObjectPage';
import NotFoundPage from 'containers/NotFoundPage';

import { makeSelectLocation, makeSelectMasterList } from './selectors';

class Routes extends PureComponent {
  render() {
    const { masterList, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/master" component={MasterListPage} />
          <Route path="/master/create" component={MasterCreatePage} />
          <Route path="/master/detail/:masterId" component={MasterDetailPage} />
          {
            masterList.map(master => (
              <Route key={master.id} exact path={`${master.url}/:masterId`} component={ObjectList} />
            ))
          }
          <Route path="" component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object,
  masterList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  masterList: makeSelectMasterList(),
});

export default connect(mapStateToProps, null)(Routes);
