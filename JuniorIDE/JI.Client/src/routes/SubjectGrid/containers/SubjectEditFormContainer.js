import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'
import GroupEditFormView from '../components/GroupEditFormView'

const mapStateToProps = (state) => ({
  group                 : state.groupsGrid.currentGroup,
  showModal             : state.groupsGrid.showEditModal,
  saveGroupError        : state.groupsGrid.saveGroupError,
  saveGroupLoading      : state.groupsGrid.saveGroupLoading,
  deleteConfirmed       : state.groupsGrid.deleteConfirmed,
  deleteGroupLoading    : state.groupsGrid.deleteGroupLoading
})

const mapDispatchToProps = {
  close                     : () => actions.setEditModalShowing(false, null),
  submit                    : actions.saveEditedGroup,
  handleGroupNameChange     : actions.onGroupNameChange,
  handleDelete              : actions.onDeleteGroup,
  handleDeleteConfirmation  : actions.onDeleteConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditFormView)
