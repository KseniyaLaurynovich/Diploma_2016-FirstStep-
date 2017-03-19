import React from 'react'
import { connect } from 'react-redux'

import Grid from '../../../containers/GridContainer'
import { fetchSubject } from '../modules/taskGrid'
import TaskGridRowView from '../components/TaskGridRowView'
import TaskGridToolbarContainer from './TaskGridToolbarContainer'
import TaskNewFormContainer from './TaskNewFormContainer'

const TaskGridContainer = React.createClass({
  getInitialState(){
    this.props.fetchSubject(this.props.params.subjectId)
    return null
  },
  render(){
    return(
      <div className='gridPage'>
        <h2>
          {
            this.props.subject
            ? this.props.subject.name
            : ''
          }
        </h2>

        <Grid
          items         = {this.props.subject ? this.props.subject.tasks : []}
          itemComponent = {TaskGridRowView}
          filter        = {(item) => {return item;}}
          openEditModal = {this.props.openEditModal}
          md            = {4}
          sm            = {6}
          xs            = {12}/>

        <TaskGridToolbarContainer/>
        <TaskNewFormContainer/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  subject     : state.tasksGrid.subject
})

const mapDispatchToProps = {
  fetchSubject  : fetchSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskGridContainer)
