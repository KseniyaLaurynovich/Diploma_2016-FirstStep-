import React from 'react'
import { connect } from 'react-redux'

import { preSaveTaskTest, onDeleteTests, actions } from '../modules/testGrid'

import TestGridView from '../components/TestGridView'
import TestGridToolbar from './TestGridToolbarContainer'

const TestGridContainer = React.createClass({
  render(){
    return (
      <div className='page--toollbar'>
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
  preSaveTaskTest         : preSaveTaskTest,
  onDeleteTests           : onDeleteTests,
  onOutputFileNameChange  : actions.outputFileNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGridContainer)
