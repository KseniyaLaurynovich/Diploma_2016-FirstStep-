import React from 'react'
import store from '../store'
import { connect } from 'react-redux'
import * as actions from '../actions/AccountActions'
import * as adminHelper from '../utils/adminHelper'
import ManagingTable from '../components/ManagingTable/ManagingTable'
import Dialog from '../components/Dialog/Dialog'
import DeleteForm from '../components/Forms/DeleteForm'
import UserFormContainer from './UserFormContainer'
import ManageRolesForm from '../components/Forms/ManageRolesForm'

var UsersManagingContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentWillMount: function(){
    adminHelper.getAllUsers().then(function(response){
        var users = response.data.map(function(user){
          return {
            Id: user.Id,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Roles: user.Roles.map((role) => role.Name).join(" "),
            RolesIds: user.Roles.map((role) => role.Id)
          }
        });
        store.dispatch(actions.getAllUsersSuccess(users));
      }
    );

    adminHelper.getAllRoles().then(function(response){
      store.dispatch(actions.getAllRolesSuccess(response.data));
    })
  },
  handleEditing: function(e){
    e.preventDefault();
    var user = {
      Id: this.props.currentUser.Id,
      Email: e.target.elements.Email.value,
      FirstName: e.target.elements.FirstName.value,
      LastName: e.target.elements.LastName.value
    }

    adminHelper.editUser(user).then(function(response){
      store.dispatch(actions.updateUserSuccess(user));
    });
  },
  handleDeleting: function(e){
    e.preventDefault();
    var current = this.props.currentUser;
    adminHelper.deleteUser(current)
    .then(function(response){
      store.dispatch(actions.deleteUserSuccess(current));
    });
  },
  handleDelete: function(){
    e.preventDefault();
  },
  manageRoles: function(user){
    store.dispatch(actions.setManageRolesDialogVisibility(true, user));
  },
  hideManageGroupsDialog: function(){
    store.dispatch(actions.setManageRolesDialogVisibility(false, true));
  },
  userDetails: function(user){
    this.context.router.push('/details/' + user.Id)
  },
  displayEditDialog: function(user){
    store.dispatch(actions.setEditUserDialogVisibility(true, user));
  },
  displayDeleteDialog: function(user){
    store.dispatch(actions.setDeleteUserDialogVisibility(true, user));
  },
  hideEditUserDialog: function(){
    store.dispatch(actions.setEditUserDialogVisibility(false, null));
  },
  hideDeleteUserDialog: function(){
    store.dispatch(actions.setDeleteUserDialogVisibility(false, null));
  },
  assignRole: function(user, role){
    adminHelper.assignToRole(user.Id, role.Name)
    .then(function(result){
      var roleId = role.Id;
      user.RolesIds.push(roleId);
      user.Roles = user.Roles.split(' ');
      user.Roles.push(role.Name);
      user.Roles = user.Roles.join(' ');
      store.dispatch(actions.assignRoleSuccess(user));
    })
  },
  unassignRole: function(user, role){
    adminHelper.unassignFromRole(user.Id, role.Name)
    .then(function(result){
      var roleId = role.Id;
      user.RolesIds = user.RolesIds.filter((r) => r != role.Id);
      user.Roles = user.Roles.split(' ').filter((r) => r != role.Name);
      user.Roles = user.Roles.join(' ');
      store.dispatch(actions.unassignRoleSuccess(user));
    })
  },
  render: function(){
    return (
      <div className="section">
        <div className="container">
        <ManagingTable
          items={this.props.users}
          fields={[
            {Key:'Email', Value:'Email'},
            {Key:'LastName', Value:'Last name'},
            {Key:'FirstName', Value:'First name'},
            {Key:'Roles', Value:'Roles'}]}
          actions={[
            {Title: "Manage roles", Action: this.manageRoles},
            {Title: "Edit", Action: this.displayEditDialog},
            {Title: "Delete", Action: this.displayDeleteDialog}
          ]}
        />
        <Dialog
          modalIsOpen={this.props.isEditing}
          close={this.hideEditUserDialog}
          header="Edit user">
          <UserFormContainer
          user={this.props.currentUser}
          handleSubmit={this.handleEditing}/>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isDeleting}
          close={this.hideDeleteUserDialog}
          header="Delete user">
          <DeleteForm
          handleOk={this.handleDeleting}>
          {"Do you really want to delete this user ?"}
          </DeleteForm>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isManagingRoles}
          close={this.hideManageGroupsDialog}
          header="Manage roles">
          <ManageRolesForm
          user={this.props.currentUser}
          roles={this.props.roles}
          handleAdd={this.assignRole}
          handleDelete={this.unassignRole}/>
        </Dialog>
      </div>
    </div>
    );
  }
});


const mapStateToProps = store => {
    return {
        users: store.usersManaging.users,
        roles: store.usersManaging.roles,
        currentUser: store.usersManaging.currentUser,
        isEditing: store.usersManaging.isEditing,
        isDeleting: store.usersManaging.isDeleting,
        isManagingRoles: store.usersManaging.isManagingRoles
    };
};

export default connect(mapStateToProps)(UsersManagingContainer)
