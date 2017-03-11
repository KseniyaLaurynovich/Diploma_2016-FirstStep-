import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsGrid'
import Grid from '../../../containers/GridContainer'
import SubjectGridRowView from '../components/SubjectGridRowView'
import SubjectEditFormContainer from './SubjectEditFormContainer'
import SubjectGridToolbarContainer from './SubjectGridToolbarContainer'

const SubjectGridContainer = React.createClass({
  getInitialState(){
    this.props.fetchSubjects()
    return {}
  },
  openEditModal(subjectId){
    if(subjectId){
      var subject = _.cloneDeep(this.props.subjects.find((subject) => {
        return subject.id == subjectId
      }))
      if(subject){
        this.props.setEditModalShowing(true, subject)
        return
      }
    }
    this.props.setEditModalShowing(true, {})
  },
  render(){
    return(
      <div className='gridPage'>
        <Grid
          items         = {this.props.subjects}
          itemComponent = {SubjectGridRowView}
          filter        = {(item) => {return item;}}
          openEditModal = {this.openEditModal}
          md            = {4}
          sm            = {6}
          xs            = {12}/>

        <SubjectGridToolbarContainer
          openEditModal = {this.openEditModal}/>
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
  fetchSubjects       : actions.fetchSubjects,
  setEditModalShowing : actions.setEditModalShowing
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectGridContainer)
