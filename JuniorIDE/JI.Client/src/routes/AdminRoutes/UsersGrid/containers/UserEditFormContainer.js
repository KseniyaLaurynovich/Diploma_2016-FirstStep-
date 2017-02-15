import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/usersgrid'
import UserEditFormView from '../components/UserEditFormView'

const mapStateToProps = (state) => ({
  user            : state.usersGrid.currentUser,
  roles           : state.usersGrid.roles,
  showModal       : state.usersGrid.showEditModal
})

const mapDispatchToProps = {
  close                   : actions.closeEditModal,
  submit                  : actions.saveEditedUser,
  handleFirstNameChange   : actions.onFirstNameChange,
  handleLastNameChange    : actions.handleLastNameChange,
  handlePatronymicChange  : actions.onPatronymicChange,
  handleRolesChanges      : actions.onRolesChange,
  handleEmailChange       : actions.onEmailChange
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditFormView)
