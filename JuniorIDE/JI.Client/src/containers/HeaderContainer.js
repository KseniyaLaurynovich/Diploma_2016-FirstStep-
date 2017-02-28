import React, { Component } from 'react'
import Header from '../components/Header'
import { Nav, NavItem } from 'react-bootstrap'
import { fetchUserInfo, logoutUser } from '../store/user'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import requests from '../utils/requests'
import _ from 'lodash'

const HeaderContainer = React.createClass({
  navItemsSwitcher : {
    null : [
      {to: '/login', label:'Sign in'},
      {to: '/registration', label:'Sign up'}
    ],
    '' : [

    ],
    'Teacher' : [
      {to: 'subjects', label:'Subjects'}
    ],
    'Student' : [
      {to: '/counter', label:'Counter'}
    ],
    'Administrator' : [
      {to: '/usersgrid', label:'Users'},
      {to: '/groupsgrid', label:'Groups'}
    ]
  },
  getNavItems(){
    if(!this.props.isAuthenticated){
      return this.navItemsSwitcher[null]
    }

    var navItems = []
    var switcher = this.navItemsSwitcher
    _.forEach(this.props.credentials.roles.split(','), function(role) {
      navItems = navItems.concat(switcher[role])
    })
    return navItems
  },
  changePassword(){
    browserHistory.push('/changepassword')
  },
  getInitialState(){
    this.props.getUserInfo()
    return {}
  },
  render(){
    return(
      <Header
        isAuthenticated = {this.props.isAuthenticated}
        userInfo        = {this.props.userInfo}
        navItems        = {this.getNavItems()}
        logoutUser      = {this.props.logoutUser}
        changePassword  = {this.changePassword}/>
    )
  }
})

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
