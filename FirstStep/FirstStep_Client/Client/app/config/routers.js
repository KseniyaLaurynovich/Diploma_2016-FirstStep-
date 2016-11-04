import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SubjectsListContainer from '../containers/SubjectsListContainer';

export default (
  <Router history={hashHistory}>
    <Route path='/' component={SubjectsListContainer}>
      <IndexRoute component={SubjectsListContainer} />
      </Route>
    </Router>
);
