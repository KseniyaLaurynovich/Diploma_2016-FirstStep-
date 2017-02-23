import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'
import SubjectEditFormView from '../components/SubjectEditFormView'

const mapStateToProps = (state) => ({
  subject             : state.subjectsgrid.currentSubject,
  showModal           : state.subjectsgrid.showEditModal,
  saveSubjectError    : state.subjectsgrid.saveSubjectError,
  saveSubjectLoading  : state.usersGrid.saveSubjectLoading
})

const mapDispatchToProps = {
  close                     : actions.closeEditModal,
  submit                    : actions.saveEditedSubject,
  handleSubjectNameChange   : actions.onSubjectNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditFormView)
