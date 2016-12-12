import React from 'react'
import store from '../store'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions/SubjectsActions'
import * as adminHelper from '../utils/adminHelper'
import ManagingTable from '../components/ManagingTable/ManagingTable'
import Dialog from '../components/Dialog/Dialog'
import DeleteForm from '../components/Forms/DeleteForm'
import SubjectFormContainer from './SubjectFormContainer'
import ManageGroupsForm from '../components/Forms/ManageGroupsForm'

var SubjectsManagingContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentWillMount: function(){
    adminHelper.getAllSubjects().then(function(response){
        var subjects = JSON.parse(response.data.Data)
                        .map(function(item){
                          return {
                            Id : item.Id,
                            Name : item.Name,
                            TasksCount : item.TasksCount,
                            UserName : `${item.User.FirstName} ${item.User.LastName} (${item.User.Email})`,
                            UserId : item.UserId,
                            AssignGroups: item.AssignGroups || []
                          }
                        });
        store.dispatch(actions.getSubjectsSuccess(subjects))
    });
    adminHelper.getAllUsers().then(function(response){
      var teachers = response.data
                      .filter((user) => user.Roles.some((role) => role.Name === "Teacher"))
                      .map(function(user){ return{Key: user.Id, Value: `${user.FirstName} ${user.LastName} (${user.Email})`}})
      store.dispatch(actions.getAllTeachesSuccess(teachers))
    })
    adminHelper.getAllGroups().then(function(response){
      store.dispatch(actions.getAllGroupsSuccess(JSON.parse(response.data.Data)));
    })
  },
  displayAddDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(true))
  },
  hideAddSubjectDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(false))
  },
  displayEditDialog: function(subject){
    store.dispatch(actions.setEditDialogVisibility(true, subject))
  },
  hideEditSubjectDialog: function(){
    store.dispatch(actions.setEditDialogVisibility(false, null))
  },
  displayDeleteDialog: function(subject){
    store.dispatch(actions.setDeleteDialogVisibility(true, subject));
  },
  hideDeleteSubjectDialog: function(){
    store.dispatch(actions.setDeleteDialogVisibility(false, null));
  },
  manageGroups: function(subject){
    store.dispatch(actions.setManageGroupsDialogVisibility(true, subject));
  },
  hideManageGroupsDialog: function(){
    store.dispatch(actions.setManageGroupsDialogVisibility(false, null));
  },
  handleAdding: function(e){
    e.preventDefault();

    var userId =  e.target.elements.UserId.value;
    var subject = {
      Name: e.target.elements.Name.value,
      UserId: userId
    }

    adminHelper.saveSubject(subject, userId).then(function(response){
      var parsedResponse = JSON.parse(response.data.Data);
      var subject = {
        Id : parsedResponse.Id,
        Name : parsedResponse.Name,
        TasksCount : parsedResponse.TasksCount,
        UserName : `${parsedResponse.User.FirstName} ${parsedResponse.User.LastName} (${parsedResponse.User.Email})`,
        UserId : parsedResponse.UserId
      }
      store.dispatch(actions.addSubjectSuccess(subject))
    });
  },
  handleEditing: function(e){
    e.preventDefault();

    var userId =  e.target.elements.UserId.value;
    var subject = {
      Id: this.props.currentSubject.Id,
      Name: e.target.elements.Name.value,
      UserId: userId
    }

    adminHelper.saveSubject(subject, userId).then(function(response){
      var parsedResponse = JSON.parse(response.data.Data);
      var subject = {
        Id : parsedResponse.Id,
        Name : parsedResponse.Name,
        TasksCount : parsedResponse.TasksCount,
        UserName : `${parsedResponse.User.FirstName} ${parsedResponse.User.LastName} (${parsedResponse.User.Email})`,
        UserId : parsedResponse.UserId
      }
      store.dispatch(actions.editSubjectSuccess(subject))
    });
  },
  handleDeleting: function(e){
    e.preventDefault();
    var subject = this.props.currentSubject;
    adminHelper.deleteSubject(this.props.currentSubject.Id).then(function(response){
      store.dispatch(actions.deleteSubjectSuccess(subject))
    })
  },
  assignGroup: function(subject, group){
    adminHelper.assignGroup(subject.Id, group.Id)
    .then(function(result){
      subject.AssignGroups.push(group);
      store.dispatch(actions.assignGroupSuccess(subject));
    })
  },
  unassignGroup: function(subject, group){
    adminHelper.unassignGroup(subject.Id, group.Id)
    .then(function(result){
      subject.AssignGroups = subject.AssignGroups.filter((ag) => ag.Id !== group.Id);
      store.dispatch(actions.unassignGroupSuccess(subject));
    })
  },
  render: function(){
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Button className="btn btn-primary" onClick={this.displayAddDialog}>Add subject</Button>
            </div>
          </div>
        </div>
        <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ManagingTable
              items={this.props.subjects}
              fields={[
                {Key:'Name', Value:'Name'},
                {Key:'TasksCount', Value:'Tasks count'},
                {Key:'UserName', Value:'User'}]}
              actions={[
                {Title: "Manage groups", Action: this.manageGroups},
                {Title: "Edit", Action: this.displayEditDialog},
                {Title: "Delete", Action: this.displayDeleteDialog}
              ]}
            />
          </div>
        </div>
        </div>
        <Dialog
          modalIsOpen={this.props.isAdding}
          close={this.hideAddSubjectDialog}
          header="Add subject">
          <SubjectFormContainer
          handleSubmit={this.handleAdding}/>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isEditing}
          close={this.hideEditSubjectDialog}
          header="Edit subject">
          <SubjectFormContainer
          handleSubmit={this.handleEditing}/>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isDeleting}
          close={this.hideDeleteSubjectDialog}
          header="Delete user">
          <DeleteForm
          handleOk={this.handleDeleting}>
          {"Do you really want to delete this subject ?"}
          </DeleteForm>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isManagingGroups}
          close={this.hideManageGroupsDialog}
          header="Manage groups">
          <ManageGroupsForm
          subject={this.props.currentSubject}
          groups={this.props.groups}
          handleAdd={this.assignGroup}
          handleDelete={this.unassignGroup}/>
        </Dialog>
      </div>
    );
  }
});


const mapStateToProps = store => {
    return {
        subjects: store.subjectsManaging.subjects,
        groups: store.subjectsManaging.groups,
        currentSubject: store.subjectsManaging.currentSubject,
        isAdding: store.subjectsManaging.isAdding,
        isEditing: store.subjectsManaging.isEditing,
        isDeleting: store.subjectsManaging.isDeleting,
        isManagingGroups: store.subjectsManaging.isManagingGroups
    };
};

export default connect(mapStateToProps)(SubjectsManagingContainer)
