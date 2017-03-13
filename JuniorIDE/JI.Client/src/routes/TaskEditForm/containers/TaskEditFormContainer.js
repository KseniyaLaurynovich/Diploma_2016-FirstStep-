import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/taskEditForm'
import TaskEditFormView from '../components/TaskEditFormView'

const TaskEditFormContainer = React.createClass({
  render(){
    return(
      <div className='gridPage'>
        <TaskEditFormView
          task                      = {this.props.task}
          handleNameChange          = {this.props.handleNameChange}
          handleDescriptionChange   = {this.props.handleDescriptionChange}
          handleTestedTypeChange    = {this.props.handleTestedTypeChange}
          outputFileChange          = {this.props.outputFileChange}
          inputFileChange           = {this.props.inputFileChange}
          newInputFileTest          = {this.props.newInputFileTest}
          newOutputFileTest         = {this.props.newOutputFileTest}
          saveNewTest               = {this.props.saveNewTest}
          saveTask                  = {this.props.saveTask}
          newTestError              = {this.props.newTestError}
          />
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  task                  : state.taskEditForm.task,
  newInputFileTest      : state.taskEditForm.newInputFileTest,
  newOutputFileTest     : state.taskEditForm.newOutputFileTest,
  newTestError          : state.taskEditForm.newTestError
})

const mapDispatchToProps = {
  handleNameChange        : actions.onNameChange,
  handleDescriptionChange : actions.onDescriptionChange,
  handleTestedTypeChange  : actions.onTestedTypeChange,
  outputFileChange        : actions.outputFileChange,
  inputFileChange         : actions.inputFileChange,
  saveNewTest             : actions.saveNewTest,
  saveTask                : actions.saveTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditFormContainer)
