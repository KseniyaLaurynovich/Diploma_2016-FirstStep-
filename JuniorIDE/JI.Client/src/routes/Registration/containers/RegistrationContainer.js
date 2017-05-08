import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/registration'

import Registration from '../components/RegistrationView'

const mapDispatchToProps = {
  submit                    : actions.registration,
  onUsernameChange          : actions.handleUsernameChange,
  onPasswordChange          : actions.handlePasswordChange,
  onConfirmPasswordChange   : actions.handleConfirmPasswordChange,
  onEmailChange             : actions.handleEmailChange,
  onFirstNameChange         : actions.handleFirstNameChange,
  onLastNameChange          : actions.handleLastNameChange,
  onPatronymicChange        : actions.handlePatronymicChange,
  onRoleChange              : actions.handleRoleChange,
  onGroupChange             : actions.handleGroupChange
}

const mapStateToProps = (state) => ({
  validationState       :  state.registration.validationState,
  registrationError     :  state.registration.registrationError,
  confirmPasswordError  :  state.registration.confirmPasswordError,
  roles                 : state.registration.roles,
  groups                : state.registration.groups
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
