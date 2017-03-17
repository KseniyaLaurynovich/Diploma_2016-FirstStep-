import React from 'react'
import { connect } from 'react-redux'

import { fetchTask, onNameChange, onDescriptionChange, onTestedTypeChange } from '../modules/task'

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
          handleTestedTypeChange  = {this.props.onTestedTypeChange}/>
        <TaskGridContainer/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  task        : state.task.currentTask,
  isEditMode  : state.task.isEditMode,
  editingTask : state.task.editingTask
})

const mapDispatchToProps = {
  fetchTask           : fetchTask,
  onNameChange        : onNameChange,
  onDescriptionChange : onDescriptionChange,
  onTestedTypeChange  : onTestedTypeChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
