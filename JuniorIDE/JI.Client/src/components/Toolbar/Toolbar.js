import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import './Toolbar.scss'

export const Toolbar = (props) => (
  <Navbar className='navbar-wide' fixedBottom>
    <Nav className='toolbar'>
      {
        props.children
      }
    </Nav>
  </Navbar>
)

export default Toolbar
