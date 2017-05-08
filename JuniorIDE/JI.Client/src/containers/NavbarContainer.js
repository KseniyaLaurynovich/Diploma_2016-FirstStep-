import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { Nav, NavItem } from 'react-bootstrap'
import { fetchUserInfo } from '../store/user'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import requests from '../utils/requests'
import _ from 'lodash'

const NavbarContainer = React.createClass({
  getInitialState(){
    this.props.getUserInfo()
    return {}
  },
  render(){
    return(
      <Navbar 
        isAuthenticated   = {this.props.isAuthenticated}
        userInfo          = {this.props.userInfo}
        header            = {this.props.header}/>
    )
  }
})

const mapDispatchToProps = {
  getUserInfo: fetchUserInfo
}

const mapStateToProps = (state) => ({
  userInfo        : state.user.userInfo,
  isAuthenticated : state.user.isAuthenticated,
  credentials     : state.user.credentials,
  header          : state.header.value
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
