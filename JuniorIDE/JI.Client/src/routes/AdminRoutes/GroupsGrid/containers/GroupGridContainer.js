import React from 'react'
import { connect } from 'react-redux'
import deep from '../../../../utils/deep'

import { actions } from '../modules/groupsgrid'

import GroupGridToolbar from './GroupGridToolbarContainer'
import Grid from '../../../../containers/GridContainer'
import GroupGridRowView from '../components/GroupGridRowView'
import GroupEditFormContainer from './GroupEditFormContainer'

const GroupGridContainer = React.createClass({
  getInitialState(){
    this.props.getGroups()
    return {}
  },
  filter(groups){
    if(this.props.textFilter && this.props.textFilter != ''){
        var textFilter = this.props.textFilter
        groups = groups.filter(function (item) {
            var arr = deep.keys(item);
            for (var i = 0; i < arr.length; i++) {
                if ((deep.getAt(item, arr[i]) || "").toString()
                  .toLowerCase()
                  .indexOf(textFilter.toLowerCase()) >= 0) {
                    return true;
                }
            }
            return false;
        });
      }

    return groups
  },
  render() {
    return  (
      <div className='gridPage'>
        <Grid
          items         = {this.props.groups}
          itemComponent = {GroupGridRowView}
          filter        = {this.filter}
          openEditModal = {this.props.openEditModal}
          md            = {4}
          sm            = {6}
          xs            = {12}/>

        <GroupGridToolbar />
        <GroupEditFormContainer />
    </div>
    )
  }
})

const mapStateToProps = (state) => ({
  groups        : state.groupsGrid.groups,
  textFilter    : state.groupsGrid.textFilter
})

const mapDispatchToProps = {
  getGroups     : actions.fetchGroups,
  openEditModal : actions.openEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupGridContainer)
