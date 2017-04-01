import React from 'react'
import { connect } from 'react-redux'
import { actions, save } from '../modules/account'
import { logoutUser } from '../../../store/user'

import AccountView from '../components/AccountView'

const mapDispatchToProps = {
  save                            : save,
  handleUsernameChange            : actions.onUsernameChange,
  handleOldPasswordChange         : actions.onOldPasswordChange,
  handleNewPasswordChange         : actions.onNewPasswordChange,
  handleConfirmNewPasswordChange  : actions.onConfirmNewPasswordChange,
  logoutUser                      : logoutUser,
  setDetailsEditMode              : actions.setDetailsEditMode                  
}

const mapStateToProps = (state) => ({
  userInfo                    : state.user.userInfo,
  confirmNewPasswordError     : state.account.confirmNewPasswordError,
  validationState             : state.account.validationState,
  isLoading                   : state.account.isLoading,
  isDetailsEditMode           : state.account.isEditDetails,
  saveError                   : state.account.saveError
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)