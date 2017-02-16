import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import LogoImage from '../../assets/Logo.png'
import './Header.scss'

const renderAccount = (props) => (
  <Nav pullRight>
      <NavDropdown eventKey={4} title={props.userInfo != null ? getUserFullName(props.userInfo) : ''}  id='basic-nav-dropdown'>
       <MenuItem eventKey={4.1} onSelect={props.changePassword}>Change password</MenuItem>
       <MenuItem divider />
       <MenuItem eventKey={4.3} onSelect={props.logoutUser}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
)


const getUserFullName= (userInfo) => {
  return userInfo.firstName + ' ' + userInfo.lastName
}

const renderNavItem = (item, index) => (
  <LinkContainer to={item.to} key={index}>
   <NavItem eventKey={index}>{item.label}</NavItem>
  </LinkContainer>
)

export const Header = (props) => (
  <Navbar inverse fixedBottom collapseOnSelect>

  <Navbar.Header>
    <Navbar.Brand>
      <img src={LogoImage}/>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>

  <Navbar.Collapse>
    <Nav>
      {
        props.navItems && props.navItems.map(renderNavItem)
      }
    </Nav>
    {
      props.isAuthenticated
        ? renderAccount(props)
        : ''
    }

  </Navbar.Collapse>
</Navbar>
)

export default Header
