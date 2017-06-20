import React from 'react'
import { browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap'

import './Navbar.scss'
import LogoImage from '../../assets/Logo_s.png'
import Person from '../../assets/men.jpg'
import Unknown from '../../assets/default-avatar.png'

function getUserFullName(userInfo){
    return userInfo.firstName + ' ' + userInfo.lastName
}

function navItemClick(to){
    browserHistory.push(to)
}

export const NavbarCustom = (props) => (
  <Navbar fixedTop className="junior-navbar">
    <Navbar.Header>
      <Navbar.Brand>
           <img src={LogoImage} />
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <p className="current-page-name">{ props.header }</p>
      <NavItem className="account pull-right" onClick={() => navItemClick('/account_settings')}>
        <Image className='userPhoto' src={Unknown} circle/>
          { 
            props.userInfo != null 
            ? getUserFullName(props.userInfo)
            : '' 
          }
      </NavItem>
    </Nav>
  </Navbar>
)

export default NavbarCustom
