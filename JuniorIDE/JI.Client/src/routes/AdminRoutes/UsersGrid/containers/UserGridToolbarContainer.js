import React from 'react'
import { connect } from 'react-redux'

import { actions } from '../modules/usersgrid'

import UserGridToolbar from '../components/UserGridToolbar'

const UserGridToolbarContainer = React.createClass({
  resetAll(){
    this.props.setFilter('', 'Filter')
    this.props.setSort('', 'Sort')
    this.props.setGroupFilter('', 'Group')
    this.props.setTextFilter('')
  },
  filterUsers(key){
    this.props.setFilter(key, this.props.filters[key].label)
  },
  sortUsers(key){
    this.props.setSort(key, this.props.sorts[key].label)
  },
  groupFilter(key){
    this.props.setGroupFilter(key, this.props.groups[key].label)
  },
  onTextFilterChange(filter){
    this.props.setTextFilter(filter)
  },
  render(){
    return(
      <UserGridToolbar
        filters                 = {this.props.filters}
        sorts                   = {this.props.sorts}
        filter                  = {this.filterUsers}
        groups                  = {this.props.groups}
        filterLabel             = {this.props.filterLabel}
        sort                    = {this.sortUsers}
        sortLabel               = {this.props.sortLabel}
        resetAll                = {this.resetAll}
        handleTextFilterChange  = {this.onTextFilterChange}
        textFilter              = {this.props.textFilter}
        groupFilter             = {this.groupFilter}
        groupFilterLabel        = {this.props.groupFilterLabel}/>
    )
  }
})

const mapStateToProps = (state) => ({
  filterLabel       : state.usersGrid.filterLabel,
  sortLabel         : state.usersGrid.sortLabel,
  textFilter        : state.usersGrid.textFilter,
  groupFilterLabel  : state.usersGrid.groupFilterLabel
})

const mapDispatchToProps = {
  setFilter         : actions.setFilter,
  setSort           : actions.setSort,
  setTextFilter     : actions.setTextFilter,
  setGroupFilter    : actions.setGroupFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGridToolbarContainer)
