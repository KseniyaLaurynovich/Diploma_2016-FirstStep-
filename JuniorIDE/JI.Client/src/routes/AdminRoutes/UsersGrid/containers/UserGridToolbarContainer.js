import React from 'react'
import { connect } from 'react-redux'

import { actions } from '../modules/usersgrid'

import UserGridToolbar from '../components/UserGridToolbar'

const UserGridToolbarContainer = React.createClass({
  resetAll(){
    this.props.setFilter('', 'Filter')
    this.props.setSort('', 'Sort')
    this.props.setTextFilter('')
  },
  filterUsers(key){
    this.props.setFilter(key, this.props.filters[key].label)
  },
  sortUsers(key){
    this.props.setSort(key, this.props.sorts[key].label)
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
        filterLabel             = {this.props.filterLabel}
        sort                    = {this.sortUsers}
        sortLabel               = {this.props.sortLabel}
        resetAll                = {this.resetAll}
        handleTextFilterChange  = {this.onTextFilterChange}
        textFilter              = {this.props.textFilter}/>
    )
  }
})

const mapStateToProps = (state) => ({
  filterKey         : state.usersGrid.filterKey,
  filterLabel       : state.usersGrid.filterLabel,
  sortKey           : state.usersGrid.sortKey,
  sortLabel         : state.usersGrid.sortLabel,
  textFilter        : state.usersGrid.textFilter
})

const mapDispatchToProps = {
  setFilter         : actions.setFilter,
  setSort           : actions.setSort,
  setTextFilter     : actions.setTextFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGridToolbarContainer)
