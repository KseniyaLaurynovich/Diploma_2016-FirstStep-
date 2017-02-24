import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'
import SubjectsGridView from '../components/SubjectsGridView'
import SubjectEditFormContainer from './SubjectEditFormContainer'

const SubjectsGridContainer = React.createClass({
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
      <SubjectsGridView
        roles         = {this.props.roles}
        subjects      = {this.props.subjects}
        openEditModal = {this.openEditModal}>
        <SubjectEditFormContainer/>
      </SubjectsGridView>
    )
  }
})

const mapStateToProps = (state) => ({
  roles       : state.user.credentials.roles,
  subjects    : state.subjectsgrid.subjects
})

const mapDispatchToProps = {
  fetchSubjects       : actions.fetchSubjects,
  setEditModalShowing : actions.setEditModalShowing
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsGridContainer)
