import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'
import SubjectsGridView from '../components/SubjectsGridView'

const SubjectsGridContainer = React.createClass({
  getInitialState(){
    this.props.fetchSubjects()
    return {}
  },
  render(){
    return(
      <SubjectsGridView
        roles     = {this.props.roles}
        subjects  = {this.props.subjects}/>
    )
  }
})

const mapStateToProps = (state) => ({
  roles       : state.user.credentials.roles,
  subjects    : state.subjectsgrid.subjects
})

const mapDispatchToProps = {
  fetchSubjects : actions.fetchSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsGridContainer)
