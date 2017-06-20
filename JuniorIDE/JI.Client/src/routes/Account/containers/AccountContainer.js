import React from 'react'
import { connect } from 'react-redux'
import { actions, saveAccountDetails, handleGroupsChanges, savePhoto } from '../modules/account'
import { logoutUser } from '../../../store/user'

import AccountView from '../components/AccountView'

const mapDispatchToProps = {
  saveAccountDetails              : saveAccountDetails,
  handleUsernameChange            : actions.onUsernameChange,
  handleOldPasswordChange         : actions.onOldPasswordChange,
  handleNewPasswordChange         : actions.onNewPasswordChange,
  handleConfirmNewPasswordChange  : actions.onConfirmNewPasswordChange,
  handleGroupsChanges             : handleGroupsChanges,
  handlePhotoChange               : savePhoto, 
  handleFirstNameChange           : actions.onFirstNameChange,
  handleLastNameChange            : actions.onLastNameChange,
  handlePatronymicChange          : actions.onPatronymicChange,
  handleEmailChange               : actions.onEmailChange,

  logoutUser                      : logoutUser,

  setDetailsEditMode              : actions.setDetailsEditMode ,
  setPrivateInfoEditMode          : actions.setPrivateInfoEditMode
}

const mapStateToProps = (state) => ({
  userInfo                    : state.user.userInfo,
  confirmNewPasswordError     : state.account.confirmNewPasswordError,
  validationState             : state.account.validationState,
  isLoading                   : state.account.isLoading,
  isDetailsEditMode           : state.account.isEditDetails,
  saveError                   : state.account.saveError,
  isPrivateInfoEditMode       : state.account.isPrivateInfoEditMode,
  groups                      : state.account.groups
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)