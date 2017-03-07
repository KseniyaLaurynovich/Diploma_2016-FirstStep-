import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsGrid'
import SubjectEditFormView from '../components/SubjectEditFormView'

const mapStateToProps = (state) => ({
  subject             : state.subjectsGrid.currentSubject,
  showModal           : state.subjectsGrid.showEditModal,
  saveSubjectError    : state.subjectsGrid.saveSubjectError,
  saveSubjectLoading  : state.subjectsGrid.saveSubjectLoading,
  deleteConfirmed     : state.subjectsGrid.deleteConfirmed,
  deleteSubjectLoading : state.subjectsGrid.deleteSubjectLoading
})

const mapDispatchToProps = {
  close                     : () => actions.setEditModalShowing(false, null),
  submit                    : actions.saveEditedSubject,
  handleSubjectNameChange   : actions.onSubjectNameChange,
  handleDelete              : actions.handleDelete,
  handleDeleteConfirmation  : actions.handleDeleteConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditFormView)
