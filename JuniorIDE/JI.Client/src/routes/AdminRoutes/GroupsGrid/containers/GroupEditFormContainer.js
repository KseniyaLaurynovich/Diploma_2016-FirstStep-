import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/groupsgrid'
import GroupEditFromView from '../components/GroupEditFromView'

const mapStateToProps = (state) => ({
  group             : state.groupsGrid.currentGroup,
  showModal         : state.groupsGrid.showEditModal,
  saveGroupError    : state.groupsGrid.saveGroupError,
  saveGroupLoading  : state.groupsGrid.saveGroupLoading,
  deleteGroupLoading: state.groupsGrid.deleteGroupLoading,
  deleteConfirmed   : state.groupsGrid.deleteConfirmed
})

const mapDispatchToProps = {
  close                     : actions.closeEditModal,
  submit                    : actions.saveEditedGroup,
  handleNameChange          : actions.onNameChange,
  handleDeleteConfirmation  : actions.onDeleteConfirmation,
  handleDelete              : actions.onDeleteGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditFromView)
