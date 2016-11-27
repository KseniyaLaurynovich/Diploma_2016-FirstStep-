import React from 'react'
import Layout from '../components/Layout/Layout'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../utils/cookieHelper'
import * as actions from '../actions/AccountActions'
import store from '../store'

var LayoutContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  login: function(){
    this.context.router.push('/login');
  },
  logout: function(){
    logout();
    store.dispatch(actions.logout());
    this.context.router.push('/login');
  },
  render: function(){
    return(
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        roles={this.props.roles}
        logout={this.logout}
        login={this.login}>
        {this.props.children}
      </Layout>
    );
  }
});

const mapStateToProps = (state) =>{
  return{
    isAuthenticated: state.auth.isAuthenticated,
    roles: state.auth.roles
  }
}

export default connect(mapStateToProps)(LayoutContainer);
