import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility, openEditMode, closeEditMode, saveTask } from '../modules/task'

import Toolbar from '../components/TaskViewToolbar'

const mapStateToProps = (state) => ({
  task        : state.task.currentTask,
  isEditMode  : state.task.isEditMode
})

const mapDispatchToProps = {
  toggleVisibility  : toggleVisibility,
  openEditMode      : openEditMode,
  closeEditMode     : closeEditMode,
  saveTask          : saveTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
