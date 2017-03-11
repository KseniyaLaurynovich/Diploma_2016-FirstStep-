import React from 'react'
import _ from 'lodash'

import deep from '../../../../utils/deep'

import { connect } from 'react-redux'
import { actions } from '../modules/usersgrid'

import UserGridToolbar from '../containers/UserGridToolbarContainer'
import Grid from '../../../../containers/GridContainer'
import UserGridRowView from '../components/UserGridRowView'
import UserEditFormContainer from './UserEditFormContainer'



const UsersGridContainer = React.createClass({
  filters(){
    return {
      ['withoutRoles'] :
        {  label: 'Without roles',
           filter: function(user, index){
            return !user.groups || user.groups.length == 0
          }
        },
      ['withoutGroups'] :
        { label: 'Without groups',
          filter: function(user, index){
           return !user.groups || user.groups.length == 0
         }
        },
      ['teacher'] :
        { label: 'Teacher',
          filter: function(user, index){
           return user.roles.indexOf('Teacher') != -1
         }
        },
      ['student'] :
        { label: 'Student',
          filter: function(user, index){
           return user.roles.indexOf('Student') != -1
         }
        },
      ['admin'] :
        { label: 'Administrator',
          filter: function(user, index){
           return user.roles.indexOf('Administrator') != -1
         }
       }
    }
  },
  sorts(){
    return {
      ['date']  :
        { label: 'Registration date',
          sort: function(user, index){
            return new Date(user.registrationDate)
          }
        },
      ['name']  :
        { label: 'Name',
          sort: function(user, index){
           return (user.firstName + ' ' + user.lastName + ' ' + user.patronymic).toLowerCase()
          }
        }
    }
  },
  groupFilter: function(user, groupId){
    return _.findIndex(user.groups, function(g){
      return g.id == groupId;
    }) != -1
  },
  getGroupsFilters(groups){
    var groupsFilters = {}
    var filter = this.groupFilter
    _.forEach(groups, function(group){
      groupsFilters[group.id] = {
        label : group.name
      }
    })
    return groupsFilters;
  },
  getInitialState(){
    this.props.getUsers(),
    this.props.getGroups(),
    this.props.getRoles()
    return {}
  },
  filter(users){
    if(this.props.filterKey != ''){
      const filter = this.filters()[this.props.filterKey]
      users = users.filter(filter.filter)
    }

    if(this.props.sortKey != ''){
      const sort = this.sorts()[this.props.sortKey]
      users = _.sortBy(users, sort.sort)
    }

    if(this.props.groupFilterKey != ''){
      var groupId = this.props.groupFilterKey
      var filter = this.groupFilter
      users = users.filter(function(user){
        return filter(user, groupId)
      })
    }

    if(this.props.textFilter != ''){
        var textFilter = this.props.textFilter
        users = users.filter(function (item) {
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

    return users
  },
  render() {
    return  (
      <div className='usersGridPage'>

        <Grid
          items         = {this.props.users}
          itemComponent = {UserGridRowView}
          openEditModal = {this.props.openEditModal}
          filter        = {this.filter}
          md            = {4}
          sm            = {6}
          xs            = {12}/>

        <UserGridToolbar
          filters       = {this.filters()}
          sorts         = {this.sorts()}
          groups        = {this.getGroupsFilters(this.props.groups)}
          openEditModal = {this.props.openEditModal}/>

        <UserEditFormContainer
          user                = {this.state.currentUser}
          showEditModal       = {this.state.showEditModal}
          roles               = {this.props.roles}
          saveEditedUser      = {this.props.editUser}
          />
    </div>);
  }
})

const mapDispatchToProps = {
  getUsers      : actions.fetchUsers,
  getRoles      : actions.fetchRoles,
  getGroups     : actions.fetchGroups,
  editUser      : actions.editUser,
  openEditModal : actions.openEditModal
}

const mapStateToProps = (state) => ({
  users             : state.usersGrid.users,
  roles             : state.usersGrid.roles,
  groups            : state.usersGrid.groups,
  filterKey         : state.usersGrid.filterKey,
  filterLabel       : state.usersGrid.filterLabel,
  sortKey           : state.usersGrid.sortKey,
  sortLabel         : state.usersGrid.sortLabel,
  textFilter        : state.usersGrid.textFilter,
  groupFilterKey    : state.usersGrid.groupFilterKey
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
