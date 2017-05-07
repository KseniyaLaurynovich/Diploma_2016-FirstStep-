import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility, openEditMode, closeEditMode, saveTask, openDeadlinesDialog } from '../modules/task'

import Toolbar from '../components/TaskViewToolbar'

const mapStateToProps = (state) => ({
  task        : state.task.currentTask,
  isEditMode  : state.task.isEditMode
})

const mapDispatchToProps = {
  toggleVisibility    : toggleVisibility,
  openEditMode        : openEditMode,
  closeEditMode       : closeEditMode,
  saveTask            : saveTask,
  openDeadlinesDialog : openDeadlinesDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
