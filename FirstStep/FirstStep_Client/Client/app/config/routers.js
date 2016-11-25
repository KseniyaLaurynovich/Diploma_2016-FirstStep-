import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {requireAuthentication} from '../components/AuthenticatedComponent'
import SubjectsGridContainer from '../containers/SubjectsGridContainer'
import LoginContainer from '../containers/LoginContainer'
import RegistrationContainer from '../containers/RegistrationContainer'
import Layout from '../containers/LayoutContainer'

export default (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={requireAuthentication(SubjectsGridContainer, ["Teacher"])} />
      <Route path="/login" component={LoginContainer}/>
      <Route path="/registration" component={RegistrationContainer}/>
    </Route>
  </Router>
);
