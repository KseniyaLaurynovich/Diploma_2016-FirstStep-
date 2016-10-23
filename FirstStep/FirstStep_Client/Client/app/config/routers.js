var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var SubjectsListContainer = require('../containers/SubjectsListContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={SubjectsListContainer}>
      <IndexRoute component={SubjectsListContainer} />
      </Route>
    </Router>
);

module.exports = routes;
