import React from 'react'
import Layout from '../components/Layout/Layout'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

var LayoutContainer = React.createClass({
  render: function(){
    return(
      <Layout>
        {this.props.children}
      </Layout>
    );
  }
});

export default LayoutContainer;
