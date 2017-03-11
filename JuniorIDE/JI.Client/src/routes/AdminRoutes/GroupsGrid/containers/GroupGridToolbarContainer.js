import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../modules/groupsgrid'

import Toolbar from '../components/GroupGridToolbar'

const GroupGridToolbarContainer = React.createClass({
  render(){
    return (
      <Toolbar
        openEditModal           = {this.props.openEditModal}
        textFilter              = {this.props.textFilter}
        handleTextFilterChange  = {this.props.setTextFilter}
        />
    )
  }
})

const mapStateToProps = (state) => ({
  textFilter    : actions.textFilter
})

const mapDispatchToProps = {
  openEditModal : actions.openEditModal,
  setTextFilter : actions.setTextFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupGridToolbarContainer)
