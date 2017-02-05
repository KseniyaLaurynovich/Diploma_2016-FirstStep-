import React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import { IndexLink, Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.scss'
import LogoImage from '../../assets/Logo.png'

export const Header = () => (
  <Navbar inverse fixedBottom collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <img src={LogoImage}/>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <LinkContainer to="/login">
       <NavItem eventKey={1}>Sign in</NavItem>
      </LinkContainer>

      <LinkContainer to="/registration">
       <NavItem eventKey={2}>Sign up</NavItem>
      </LinkContainer>

      <LinkContainer to="/counter">
       <NavItem eventKey={3}>Counter</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>
)

export default Header
