import React, { Component } from 'react'
import Header from '../components/Header'
import { Nav, NavItem } from 'react-bootstrap'
import { fetchUserInfo, logoutUser } from '../store/user'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class HeaderContainer  extends Component {
  navItems = {
    '' : [
      {to: '/login', label:'Sign in'},
      {to: '/registration', label:'Sign up'}
    ],
    'Student' : [
      {to: '/counter', label:'Counter'}
    ]
  }
  getNavItems(){
    if(!this.props.isAuthenticated){
      return this.navItems['']
    }
    return this.navItems[this.props.credentials.roles]
  }
  changePassword(){
    browserHistory.push('/changepassword')
  }
  render(){
    return(
      <Header
        navItems={this.getNavItems()}
        name="undefined"
        logoutUser={this.props.logoutUser}
        changePassword={this.changePassword}/>
    )
  }
}

const mapDispatchToProps = {
  getUserInfo: fetchUserInfo,
  logoutUser
}

const mapStateToProps = (state) => ({
  userInfo        : state.user.userInfo,
  isAuthenticated : state.user.isAuthenticated,
  credentials     : state.user.credentials
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
