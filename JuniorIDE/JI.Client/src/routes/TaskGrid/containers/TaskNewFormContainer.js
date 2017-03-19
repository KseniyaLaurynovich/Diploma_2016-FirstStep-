import React from 'react'
import { connect } from 'react-redux'

import { closeNewTaskModal, saveNewTask, actions } from '../modules/taskGrid'
import TaskNewFormView from '../components/TaskNewFormView'

const mapStateToProps = (state) => ({
  showModal   : state.tasksGrid.showNewTaskModal,
  saveError   : state.tasksGrid.createNewTaskError,
  saveLoading : state.tasksGrid.saveNewTaskLoading
})

const mapDispatchToProps = {
  close             : closeNewTaskModal,
  submit            : saveNewTask,
  handleNameChange  : actions.onNewTaskNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNewFormView)
