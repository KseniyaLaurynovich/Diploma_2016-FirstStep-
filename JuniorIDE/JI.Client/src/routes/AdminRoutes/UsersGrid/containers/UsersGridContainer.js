import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { fetchUsers, fetchRoles  } from '../modules/usersgrid'
import UserGridRowView from '../components/UserGridRowView'
import UserEditFormView from '../components/UserEditFormView'

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

    this.setState(Object.assign({}, this.state, { showEditModal: show, currentUser: user }))
  },
  addRoleToCurrentUser(role){
    var user = Object.assign({}, this.state.currentUser);
    if(user){
      user.roles.push(role.name);
    }
    this.setState(Object.assign({}, this.state, { currentUser: user }))
  },
  removeRoleFromCurrentUser(role){
    var user = Object.assign({}, this.state.currentUser);
    if(user){
      var roleIndex = user.roles.indexOf(role.name);
      user.roles.splice(roleIndex, 1)
    }
    this.setState(Object.assign({}, this.state, { currentUser: user }))
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

      <UserEditFormView
        user={this.state.currentUser}
        roles={this.props.roles}
        addRole={this.addRoleToCurrentUser}
        removeRole={this.removeRoleFromCurrentUser}
        showModal={this.state.showEditModal}
        close={() => this.setEditModalShowing(null, false)}/>
    </div>);
  }
})

const mapDispatchToProps = {
  getUsers  : fetchUsers,
  getRoles  : fetchRoles
}

const mapStateToProps = (state) => ({
  users     : state.usersGrid.users,
  roles     : state.usersGrid.roles
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
