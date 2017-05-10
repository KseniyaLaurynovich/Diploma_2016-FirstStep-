import React, { Component } from 'react'
import Menu from '../components/Menu'
import { Nav, NavItem } from 'react-bootstrap'
import { fetchUserInfo } from '../store/user'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import requests from '../utils/requests'
import _ from 'lodash'

const MenuContainer = React.createClass({
  navItemsSwitcher : {
    null : [
    ],
    '' : [
    ],
    'Teacher' : [
      {to: '/subjects', icon: 'briefcase'}
    ],
    'Administrator' : [
      {to: '/usersgrid', icon: 'user'},
      {to: '/groupsgrid', icon: 'education'}
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
  getInitialState(){
    this.props.getUserInfo()
    return {}
  },
  render(){
    return(
      <Menu
        isAuthenticated   = {this.props.isAuthenticated}
        userInfo          = {this.props.userInfo}
        navItems          = {this.getNavItems()}/>
    )
  }
})

const mapDispatchToProps = {
  getUserInfo: fetchUserInfo
}

const mapStateToProps = (state) => ({
  userInfo        : state.user.userInfo,
  isAuthenticated : state.user.isAuthenticated,
  credentials     : state.user.credentials
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
