import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/subjectsgrid'

import Toolbar from '../components/SubjectGridToolbar'

const SubjectGridToolbarContainer = React.createClass({
  render(){
    return (
      <Toolbar openEditModal = {this.props.openEditModal}/>
    )
  }
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  openEditModal : actions.openEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectGridToolbarContainer)
