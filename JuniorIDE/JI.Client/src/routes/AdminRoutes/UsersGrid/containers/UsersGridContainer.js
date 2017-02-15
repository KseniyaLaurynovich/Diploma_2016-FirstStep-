import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { actions } from '../modules/usersgrid'
import UserGridRowView from '../components/UserGridRowView'
import UserEditFormContainer from './UserEditFormContainer'


const UsersGridContainer = React.createClass({
  getInitialState(){
    this.props.getUsers()
    this.props.getRoles()
    return {}
  },
  render() {
    return  (
      <div className='usersGridPage'>
        <Griddle
          results={this.props.users}
          customRowComponent={UserGridRowView}
          showFilter={true}
          useCustomRowComponent={true}
          enableInfiniteScroll={true}
          globalData={{openEditModal: this.props.openEditModal}}/>

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
  editUser      : actions.editUser,
  openEditModal : actions.openEditModal
}

const mapStateToProps = (state) => ({
  users     : state.usersGrid.users,
  roles     : state.usersGrid.roles
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
