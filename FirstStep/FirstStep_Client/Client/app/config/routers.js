import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import {requireAuthentication} from '../components/AuthenticatedComponent'
import SubjectsGridContainer from '../containers/SubjectsGridContainer'
import LoginContainer from '../containers/LoginContainer'
import RegistrationContainer from '../containers/RegistrationContainer'
import LayoutContainer from '../containers/LayoutContainer'
import TaskDetailsContainer from '../containers/TaskDetailsContainer'
import UsersManagingContainer from '../containers/UsersManagingContainer'
import SubjectsManagingContainer from '../containers/SubjectsManagingContainer'
import TasksManagingContainer from '../containers/TasksManagingContainer'
import GroupsManagingContainer from '../containers/GroupsManagingContainer'

export default (
  <Router history={hashHistory}>
    <Route path='/' component={LayoutContainer}>
      <IndexRoute component={requireAuthentication(SubjectsGridContainer, ["Teacher"])} />
      <Route path="/login" component={LoginContainer}/>
      <Route path="/registration" component={RegistrationContainer}/>
      <Route path="/task/:taskId" component={requireAuthentication(TaskDetailsContainer, ["Teacher"])}/>
      <Route path="/users" component={requireAuthentication(UsersManagingContainer, ["Admin"])} />
      <Route path="/subjects" component={requireAuthentication(SubjectsManagingContainer, ["Admin"])} />
      <Route path="/tasks" component={requireAuthentication(TasksManagingContainer, ["Admin"])} />
      <Route path="/groups" component={requireAuthentication(GroupsManagingContainer, ["Admin"])} />
    </Route>
  </Router>
);
