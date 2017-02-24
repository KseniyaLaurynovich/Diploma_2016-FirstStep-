import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'
import SubjectEditFormView from '../components/SubjectEditFormView'

const mapStateToProps = (state) => ({
  subject               : state.subjectsgrid.currentSubject,
  showModal             : state.subjectsgrid.showEditModal,
  saveSubjectError      : state.subjectsgrid.saveSubjectError,
  saveSubjectLoading    : state.subjectsgrid.saveSubjectLoading,
  deleteConfirmed       : state.subjectsgrid.deleteConfirmed,
  deleteSubjectLoading  : state.subjectsgrid.deleteSubjectLoading
})

const mapDispatchToProps = {
  close                     : () => actions.setEditModalShowing(false, null),
  submit                    : actions.saveEditedSubject,
  handleSubjectNameChange   : actions.onSubjectNameChange,
  handleDelete              : actions.onDeleteSubject,
  handleDeleteConfirmation  : actions.onDeleteConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditFormView)
