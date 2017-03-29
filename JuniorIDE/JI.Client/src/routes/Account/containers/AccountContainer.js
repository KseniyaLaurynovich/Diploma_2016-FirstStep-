import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/account'
import { logoutUser } from '../../../store/user'

import AccountView from '../components/AccountView'

const mapDispatchToProps = {
  submit                          : actions.changePassword,
  handleOldPasswordChange         : actions.onOldPasswordChange,
  handleNewPasswordChange         : actions.onNewPasswordChange,
  handleConfirmNewPasswordChange  : actions.onConfirmNewPasswordChange,
  logoutUser                       
}

const mapStateToProps = (state) => ({
  userInfo                    : state.user.userInfo,
  confirmNewPasswordError     : state.account.confirmNewPasswordError,
  validationState             : state.account.validationState,
  changePasswordError         : state.account.changePasswordError,
  isLoading                   : state.account.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)