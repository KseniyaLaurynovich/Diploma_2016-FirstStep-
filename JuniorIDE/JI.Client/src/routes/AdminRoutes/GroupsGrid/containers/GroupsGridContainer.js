import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { actions } from '../modules/groupsgrid'
import GroupGridRowView from '../components/GroupGridRowView'
import GroupEditFormContainer from './GroupEditFormContainer'

const GroupsGridContainer = React.createClass({
  getInitialState(){
    this.props.getGroups()
    return {}
  },
  render() {
    return  (
      <div className='groupsGridPage'>
        <Griddle
          results               = {this.props.groups}
          customRowComponent    = {GroupGridRowView}
          showFilter            = {true}
          useCustomRowComponent = {true}
          enableInfiniteScroll  = {true}
          globalData            = {{openEditModal: this.props.openEditModal}}
          />
          <GroupEditFormContainer/>
    </div>);
  }
})

const mapStateToProps = (state) => ({
  groups: state.groupsGrid.groups
})

const mapDispatchToProps = {
  getGroups     : actions.fetchGroups,
  openEditModal : actions.openEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsGridContainer)
