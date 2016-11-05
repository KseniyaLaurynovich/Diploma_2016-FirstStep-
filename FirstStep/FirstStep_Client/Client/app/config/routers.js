import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SubjectsGridContainer from '../containers/SubjectsGridContainer';

export default (
  <Router history={hashHistory}>
    <Route path='/' component={SubjectsGridContainer}>
      <IndexRoute component={SubjectsGridContainer} />
      </Route>
    </Router>
);
