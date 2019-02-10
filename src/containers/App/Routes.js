import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage';
import { MasterListPage, MasterCreatePage, MasterDetailPage } from 'containers/MasterPage';
import NotFoundPage from 'containers/NotFoundPage';

import { makeSelectLocation } from './selectors';

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/master" component={MasterListPage} />
        <Route path="/master/create" component={MasterCreatePage} />
        <Route path="/master/detail/:masterId" component={MasterDetailPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps, null)(Routes);
