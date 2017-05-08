import React from 'react'
import { connect } from 'react-redux'

import Grid from '../../../containers/GridContainer'
import TaskGridRowView from '../components/TaskGridRowView'
import TaskGridToolbarContainer from './TaskGridToolbarContainer'
import TaskNewFormContainer from './TaskNewFormContainer'

const TaskGridContainer = React.createClass({
  render(){
    return(
      <div className='gridPage'>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskGridContainer)
