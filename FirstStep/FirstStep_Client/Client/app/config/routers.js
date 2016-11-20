import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {requireAuthentication} from '../components/AuthenticatedComponent';
import SubjectsGridContainer from '../containers/SubjectsGridContainer';
import LoginContainer from '../containers/LoginContainer';
import RegistrationContainer from '../containers/RegistrationContainer';

export default (
  <Router history={hashHistory}>
    <Route path='/' component={requireAuthentication(SubjectsGridContainer, ["Teacher"])}>
      <IndexRoute component={SubjectsGridContainer} />
    </Route>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/registration" component={RegistrationContainer}/>
  </Router>
);
