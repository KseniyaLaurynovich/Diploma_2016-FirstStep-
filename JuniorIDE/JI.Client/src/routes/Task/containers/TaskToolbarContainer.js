import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility, openEditMode, closeEditMode, saveTask } from '../modules/task'

import Toolbar from '../components/TaskViewToolbar'

const mapStateToProps = (state) => ({
  isVisible   : state.task.currentTask ? state.task.currentTask.isVisible : false,
  isEditMode  : state.task.isEditMode
})

const mapDispatchToProps = {
  toggleVisibility  : toggleVisibility,
  openEditMode      : openEditMode,
  closeEditMode     : closeEditMode,
  saveTask          : saveTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
