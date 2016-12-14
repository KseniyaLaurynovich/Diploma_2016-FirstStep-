import React from 'react'
import store from '../store'
import { connect } from 'react-redux'
import * as actions from '../actions/GroupsActions'
import * as adminHelper from '../utils/adminHelper'
import ManagingTable from '../components/ManagingTable/ManagingTable'
import Dialog from '../components/Dialog/Dialog'
import DeleteForm from '../components/Forms/DeleteForm'
import { Button } from 'react-bootstrap'
import GroupFormContainer from './GroupFormContainer'

var UsersManagingContainer = React.createClass({
  componentWillMount: function(){
    adminHelper.getAllGroups().then(function(response){
        var groups = response.data;
        store.dispatch(actions.getGroupsSuccess(groups));
      }
    );
  },
  displayAddGroupDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(true, null))
  },
  hideAddGroupDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(false, null))
  },
  displayEditDialog: function(group){
    store.dispatch(actions.setEditDialogVisibility(true, group))
  },
  hideEditGroupDialog: function(){
    store.dispatch(actions.setEditDialogVisibility(false, null))
  },
  displayDeleteDialog: function(group){
    store.dispatch(actions.setDeleteDialogVisibility(true, group))
  },
  hideDeleteGroupDialog: function(){
    store.dispatch(actions.setDeleteDialogVisibility(false, null))
  },
  handleAdding: function(e){
    e.preventDefault();

    var group={
      Id: this.props.currentGroup && this.props.currentGroup.Id,
      Name: e.target.elements.Name.value
    }

    adminHelper.saveGroup(group).then(function(response){
      var group = response.data;
      store.dispatch(actions.addGroupSuccess(group))
    })
  },
  handleEditing: function(e){
    e.preventDefault();

    var group={
      Id: this.props.currentGroup && this.props.currentGroup.Id,
      Name: e.target.elements.Name.value
    }

    adminHelper.saveGroup(group).then(function(response){
      var group = response.data;
      store.dispatch(actions.editGroupSuccess(group))
    })
  },
  handleDeleting: function(e){
    e.preventDefault();

    var id = this.props.currentGroup.Id;
    adminHelper.deleteGroup(id).then(function(response){
      store.dispatch(actions.deleteGroupSuccess(id))
    })
  },
  render: function(){
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Button className="btn btn-primary" onClick={this.displayAddGroupDialog}>Add group</Button>
            </div>
          </div>
        </div>
        <div className="container">
        <ManagingTable
          items={this.props.groups}
          fields={[
            {Key:'Name', Value:'Name'}]}
          actions={[
            {Title: "Edit", Action: this.displayEditDialog},
            {Title: "Delete", Action: this.displayDeleteDialog}
          ]}
        />
      </div>
      <Dialog
        modalIsOpen={this.props.isAdding}
        close={this.hideAddGroupDialog}
        header="Add group">
        <GroupFormContainer
        handleSubmit={this.handleAdding}/>
      </Dialog>
      <Dialog
        modalIsOpen={this.props.isEditing}
        close={this.hideEditGroupDialog}
        header="Edit group">
        <GroupFormContainer
        handleSubmit={this.handleEditing}/>
      </Dialog>
      <Dialog
        modalIsOpen={this.props.isDeleting}
        close={this.hideDeleteGroupDialog}
        header="Delete group">
        <DeleteForm
        handleOk={this.handleDeleting}>
        {"Do you really want to delete this group ?"}
        </DeleteForm>
      </Dialog>
    </div>
    );
  }
});


const mapStateToProps = store => {
    return {
        groups: store.groupsManaging.groups,
        currentGroup: store.groupsManaging.currentGroup,
        isAdding: store.groupsManaging.isAdding,
        isEditing: store.groupsManaging.isEditing,
        isDeleting: store.groupsManaging.isDeleting
    };
};

export default connect(mapStateToProps)(UsersManagingContainer)
