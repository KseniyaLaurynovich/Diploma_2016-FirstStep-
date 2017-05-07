import React from 'react'
import { browserHistory } from 'react-router'
import { IndexLink, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

import './Menu.scss'
import LogoImage from '../../assets/Logo.png'

var Menu = React.createClass({
  getInitialState(){
    return {
      showAccountMenu: false
    }
  },
  navItemClick(to){
    browserHistory.push(to)
  },
  toggleAccountMenu(){
    this.setState({
      showAccountMenu: !this.state.showAccountMenu
    })
  },
  renderAccount(props){
    return (
      <NavItem onClick={() => this.navItemClick('/account_settings')}>
          <Glyphicon className='glypicon-md' glyph='user'/>
          { 
            props.userInfo != null 
            ? this.getUserFullName(props.userInfo)
            : '' 
          }
      </NavItem>
    )
  },
  getUserFullName(userInfo){
    return userInfo.firstName + ' ' + userInfo.lastName
  },
  renderNavItem(item, index){
    return(
       <NavItem eventKey={index} key={index} onClick={() => this.navItemClick(item.to)}>
          <Glyphicon className='glypicon-md' glyph={item.icon}/>
            {item.label}
       </NavItem>
    )
  },
  render(){
    return(
      <Navbar className='leftSidebar' collapseOnSelect>
        <Navbar.Header className='nav-header-bottom'>
          <Navbar.Brand>
            <img className='brand-logo' src={LogoImage}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

         <Navbar.Collapse>
           <Nav className='menu-list'>
             {
                 this.props.isAuthenticated ? this.renderAccount(this.props) : ''
             }
             {
                 this.props.navItems && this.props.navItems.map(this.renderNavItem)
             }
           </Nav>
         </Navbar.Collapse>
     </Navbar>
    )
  }
})

export default Menu
