import React from 'react'
import styles from './styles.css'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default function(props){
  return(
    <div>
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="hidden-md hidden-sm hidden-xs navbar-brand" href="#"><span>First Step</span></a>

          </div>
          <div className="collapse navbar-collapse" id="navbar-ex-collapse">
            <ul className="nav navbar-nav navbar-right">
              {
                props.roles.indexOf('Teacher') != -1
                  ? (<li><a href="#">Tasks</a></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><Link className="btn btn-primary" to="/users">Users</Link></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><Link className="btn btn-primary" to="/subjects">Subjects</Link></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><Link className="btn btn-primary" to="/tasks">Tasks</Link></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><a href="#">Tests</a></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><a href="#">Projects</a></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><a href="#">Roles</a></li>)
                  : null
              }
              {
                props.roles.indexOf('Admin') != -1
                  ? (
                    <li><a href="#">Groups</a></li>)
                  : null
              }
              {
                !props.isAuthenticated
                  ? (<li><a href="#" onClick={props.login}>Login</a></li>)
                  : (<li><a href="#" onClick={props.logout}>Logout</a></li>)
              }
            </ul>
          </div>
        </div>
      </div>
    {
      props.children
    }
    <footer className="section section-primary">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Footer header</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit,
                            sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="text-info text-right">
                          &nbsp;
                          &nbsp;
                        </p>
                        <div className="row">
                            <div className="col-md-12 hidden-lg hidden-md hidden-sm text-left">
                                <a href="#"><i className="fa fa-3x fa-fw fa-instagram text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-twitter text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-facebook text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-github text-inverse"></i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 hidden-xs text-right">
                                <a href="#"><i className="fa fa-3x fa-fw fa-instagram text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-twitter text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-facebook text-inverse"></i></a>
                                <a href="#"><i className="fa fa-3x fa-fw fa-github text-inverse"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  </div>
  );
}
