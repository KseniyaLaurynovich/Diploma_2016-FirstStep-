import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsGrid'
import Grid from '../../../containers/GridContainer'
import SubjectGridRowView from '../components/SubjectGridRowView'
import SubjectEditFormContainer from './SubjectEditFormContainer'
import SubjectGridToolbarContainer from './SubjectGridToolbarContainer'

const SubjectGridContainer = React.createClass({
  render(){
    return(
      <div className='gridPage'>
        <Grid
          items         = {this.props.subjects}
          itemComponent = {SubjectGridRowView}
          filter        = {(item) => {return item;}}
          openEditModal = {this.props.openEditModal}
          md            = {4}
          sm            = {6}
          xs            = {12}/>

        <SubjectGridToolbarContainer/>
        <SubjectEditFormContainer/>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  roles       : state.user.credentials.roles,
  subjects    : state.subjectsGrid.subjects
})

const mapDispatchToProps = {
  openEditModal       : actions.openEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectGridContainer)
