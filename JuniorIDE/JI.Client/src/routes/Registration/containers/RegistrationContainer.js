import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/registration'

import Registration from '../components/RegistrationView'

const mapDispatchToProps = {
  submit                    : actions.registration,
  onUsernameChange          : actions.handleUsernameChange,
  onPasswordChange          : actions.handlePasswordChange,
  onConfirmPasswordChange   : actions.handleConfirmPasswordChange,
  onEmailChange             :  actions.handleEmailChange,
  onFirstNameChange         : actions.handleFirstNameChange,
  onLastNameChange          : actions.handleLastNameChange,
  onPatronymicChange        : actions.handlePatronymicChange
}

const mapStateToProps = (state) => ({
  registrationState     :  state.registration.registrationState,
  registrationError     :  state.registration.registrationError,
  usernameError         :  state.registration.usernameError,
  passwordError         :  state.registration.passwordError,
  consfirmPasswordError :  state.registration.consfirmPasswordError,
  firstNameError        :  state.registration.firstNameError,
  lastNameError         :  state.registration.lastNameError,
  patronymicError       :  state.registration.patronymicError,
  emailError            :  state.registration.emailError
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
