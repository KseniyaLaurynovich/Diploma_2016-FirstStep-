import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {requireAuthentication} from '../components/AuthenticatedComponent'
import SubjectsGridContainer from '../containers/SubjectsGridContainer'
import LoginContainer from '../containers/LoginContainer'
import RegistrationContainer from '../containers/RegistrationContainer'
import LayoutContainer from '../containers/LayoutContainer'
import TaskDetailsContainer from '../containers/TaskDetailsContainer'

export default (
  <Router history={hashHistory}>
    <Route path='/' component={LayoutContainer}>
      <IndexRoute component={requireAuthentication(SubjectsGridContainer, ["Teacher"])} />
      <Route path="/login" component={LoginContainer}/>
      <Route path="/registration" component={RegistrationContainer}/>
      <Route path="/task/:taskId" component={requireAuthentication(TaskDetailsContainer, ["Teacher"])}/>
    </Route>
  </Router>
);
