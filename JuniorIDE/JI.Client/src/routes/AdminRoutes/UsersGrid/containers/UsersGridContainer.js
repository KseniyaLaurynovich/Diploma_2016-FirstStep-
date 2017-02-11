import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { fetchUsers, fetchRoles, editUser  } from '../modules/usersgrid'
import UserGridRowView from '../components/UserGridRowView'
import UserEditForm from './UserEditForm'
import _ from 'lodash'

const UsersGridContainer = React.createClass({
  getInitialState(){
    this.props.getUsers()
    this.props.getRoles()
    return {
      showEditModal : false,
      currentUser   : null
    }
  },
  setEditModalShowing(userId, show){
    var user = null;
    if(userId != null){
      user = this.props.users.find((element) => {
        return element.id === userId
      });
    }

    this.setState({ showEditModal: show, currentUser: _.cloneDeep(user) })
  },
  render() {
    return  (
      <div className='usersGridPage'>
      <Griddle
        results={this.props.users}
        showFilter={true}
        useCustomRowComponent={true}
        customRowComponent={UserGridRowView}
        enableInfiniteScroll={true}
        globalData={{openEditModal: (userId) => this.setEditModalShowing(userId, true)}}/>

      <UserEditForm
        user                = {this.state.currentUser}
        showEditModal       = {this.state.showEditModal}

        roles               = {this.props.roles}
        saveEditedUser      = {this.props.editUser}

        setEditModalShowing = {this.setEditModalShowing}
        />
    </div>);
  }
})

const mapDispatchToProps = {
  getUsers  : fetchUsers,
  getRoles  : fetchRoles,
  editUser  : editUser
}

const mapStateToProps = (state) => ({
  users     : state.usersGrid.users,
  roles     : state.usersGrid.roles
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
