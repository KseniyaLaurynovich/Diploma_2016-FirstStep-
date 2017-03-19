import React from 'react'
import { connect } from 'react-redux'

import { fetchTask, onNameChange, onDescriptionChange, onTestedTypeChange, onSharedTypeChange, onDeleteConfirmation, deleteTask } from '../modules/task'

import TaskView from '../components/TaskView'
import TaskGridContainer from './TaskToolbarContainer'

const TaskContainer = React.createClass({
  getInitialState(){
    this.props.fetchTask(this.props.params.taskId)
    return null
  },

  render(){
    return(
      <div className='gridPage'>
        <TaskView
          item                    = {this.props.task}
          editingItem             = {this.props.editingTask}
          isEditMode              = {this.props.isEditMode}
          handleNameChange        = {this.props.onNameChange}
          handleDescriptionChange = {this.props.onDescriptionChange}
          handleTestedTypeChange  = {this.props.onTestedTypeChange}
          handleSharedTypeChange  = {this.props.onSharedTypeChange}
          handleDeleteConfirmation= {this.props.onDeleteConfirmation}
          handleDelete            = {this.props.onDelete}
          deleteConfirmed         = {this.props.deleteConfirmed}
          deleteLoading           = {this.props.deleteLoading}/>
        <TaskGridContainer/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  task            : state.task.currentTask,
  isEditMode      : state.task.isEditMode,
  editingTask     : state.task.editingTask,
  deleteConfirmed : state.task.deleteConfirmed,
  deleteLoading   : state.task.deleteLoading
})

const mapDispatchToProps = {
  fetchTask           : fetchTask,
  onNameChange        : onNameChange,
  onDescriptionChange : onDescriptionChange,
  onTestedTypeChange  : onTestedTypeChange,
  onSharedTypeChange  : onSharedTypeChange,
  onDelete            : deleteTask,
  onDeleteConfirmation: onDeleteConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
