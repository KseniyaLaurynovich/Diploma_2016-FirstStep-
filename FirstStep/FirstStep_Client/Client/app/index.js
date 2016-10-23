var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routers');
var configureStore = require('./store/configureStore');
var AppContainer = require('react-hot-loader').AppContainer;
require("./material.min.css");

const store = configureStore();

ReactDOM.render(
    routes,
    document.getElementById('app')
);
