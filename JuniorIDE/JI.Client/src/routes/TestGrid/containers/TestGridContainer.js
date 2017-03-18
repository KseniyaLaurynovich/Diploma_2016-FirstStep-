import React from 'react'
import { connect } from 'react-redux'

import { fetchTask, preSaveTaskTest } from '../modules/testGrid'

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
        <TestGridView tests={this.props.tests}
          handleEditingPreSave={this.props.preSaveTaskTest}/>
        <TestGridToolbar/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  task  : state.testGrid.currentTask,
  tests : state.testGrid.currentTask != null
    ? state.testGrid.currentTask.tests == null ? [] : state.testGrid.currentTask.tests
    : [],
})

const mapDispatchToProps = {
  fetchTask       : fetchTask,
  preSaveTaskTest : preSaveTaskTest
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGridContainer)
