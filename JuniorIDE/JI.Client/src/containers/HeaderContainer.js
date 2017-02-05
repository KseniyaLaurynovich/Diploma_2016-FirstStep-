import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import Account from '../components/Account'
import { Nav, NavItem } from 'react-bootstrap'

class HeaderContainer  extends Component {
  render(){
    return(
      <Header>
         <Nav pullRight>
            <Account/>
         </Nav>
      </Header>
    )
  }
}

export default HeaderContainer
