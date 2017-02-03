import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/login'

import Login from '../components/LoginView'

const mapDispatchToProps = {
  submit              : actions.login,
  onLoginChange       : actions.handleLoginChange,
  onPasswordChange    : actions.handlePasswordChange,
  onIsRememberChange  : actions.handleIsRememberChange
}

const mapStateToProps = (state) => ({
  loginState :  state.login.loginState,
  loginError :  state.login.loginError
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
