import React from 'react'
import { connect } from 'react-redux'

import { fetchTask, preSaveTaskTest, onDeleteTests, actions } from '../modules/testGrid'

import TestGridView from '../components/TestGridView'
import TestGridToolbar from './TestGridToolbarContainer'

const TestGridContainer = React.createClass({
  getInitialState(){
    this.props.fetchTask(this.props.params.taskId)
    return null
  },

  render(){
    return (
      <div className='page--toollbar'>
        <h2>
          {
            this.props.task == null ? '' : 'Tests for ' + this.props.task.name
          }
        </h2>
        <TestGridView
          tests                      = {this.props.tests}
          outputFileNameError        = {this.props.outputFileNameError}
          testsError                 = {this.props.testsError}
          outputFileName             = {this.props.outputFileName}
          handleOutputFileNameChange = {this.props.onOutputFileNameChange}
          handleEditingPreSave       = {this.props.preSaveTaskTest}
          handleDeleteRows           = {this.props.onDeleteTests}/>
        <TestGridToolbar/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  task                : state.testGrid.currentTask,
  tests               : state.testGrid.currentTask.tests,
  outputFileNameError : state.testGrid.outputFileNameError,
  testsError          : state.testGrid.testsError,
  outputFileName      : state.testGrid.currentTask.outputFileName
})

const mapDispatchToProps = {
  fetchTask               : fetchTask,
  preSaveTaskTest         : preSaveTaskTest,
  onDeleteTests           : onDeleteTests,
  onOutputFileNameChange  : actions.outputFileNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGridContainer)
