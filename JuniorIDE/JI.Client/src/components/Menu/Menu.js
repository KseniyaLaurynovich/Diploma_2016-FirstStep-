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
      <Nav>
          <NavItem onClick={this.toggleAccountMenu}>
            { props.userInfo != null ? this.getUserFullName(props.userInfo) + ' ' : '' }
            <span className='caret'></span>
          </NavItem>
          {
            this.state.showAccountMenu
            ? <NavItem eventKey={4.1} onSelect={props.changePassword}>Change password</NavItem>
            : ''
          }
          {
            this.state.showAccountMenu
            ? <NavItem eventKey={4.3} onSelect={props.logoutUser}>Logout</NavItem>
            : ''
          }
      </Nav>
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
      <Navbar className='sidebar' collapseOnSelect>
        <Navbar.Header className='nav-header-bottom'>
          <Navbar.Brand>
            <img className='brand-logo' src={LogoImage}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

         <Navbar.Collapse>
           {
             this.props.isAuthenticated ? this.renderAccount(this.props) : ''
           }
           <Nav className='menu-list'>
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
