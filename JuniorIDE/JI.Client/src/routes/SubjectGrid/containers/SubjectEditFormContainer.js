import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsGrid'
import SubjectEditFormView from '../components/SubjectEditFormView'

const mapStateToProps = (state) => ({
  groups              : state.subjectsGrid.groups,
  subject             : state.subjectsGrid.currentSubject,
  showModal           : state.subjectsGrid.showEditModal,
  saveSubjectError    : state.subjectsGrid.saveSubjectError,
  saveSubjectLoading  : state.subjectsGrid.saveSubjectLoading,
  deleteConfirmed     : state.subjectsGrid.deleteConfirmed,
  deleteSubjectLoading : state.subjectsGrid.deleteSubjectLoading
})

const mapDispatchToProps = {
  close                     : actions.closeEditModal,
  submit                    : actions.saveEditedSubject,
  handleSubjectNameChange   : actions.onSubjectNameChange,
  handleDelete              : actions.onDeleteSubject,
  handleDeleteConfirmation  : actions.onDeleteConfirmation,
  handleGroupsChanges       : actions.onGroupsChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditFormView)
