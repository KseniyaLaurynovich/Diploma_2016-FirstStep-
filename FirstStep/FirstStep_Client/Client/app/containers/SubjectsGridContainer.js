import React from 'react';
import SubjectsGrid from '../components/SubjectsGrid/SubjectsGrid';
import { connect } from 'react-redux';
import store from '../store';
import { getSubjectsForUser, addSubject, deleteSubjectById, addTask } from '../utils/subjectsHelper';
import * as actions from '../actions/SubjectsGridActions';
import * as groupsActions from '../actions/GroupsActions';
import { getAllGroups, assignGroup, unassignGroup } from '../utils/groupsHelper'

var SubjectListContainer = React.createClass({
    componentWillMount: function(){
        getSubjectsForUser()
        .then(function(response){
            store.dispatch(actions.getSubjectsSuccess(JSON.parse(response.data.Data)));
            return response;
        });
    },
    displayAddDialog: function(){
        store.dispatch(actions.setAddDialogVisibility(true));
    },
    hideAddDialog: function(){
        store.dispatch(actions.setAddDialogVisibility(false));
    },
    displayDeleteDialog: function(id){
        store.dispatch(actions.setDeleteDialogVisibility(true, id));
    },
    hideDeleteDialog: function(){
        store.dispatch(actions.setDeleteDialogVisibility(false));
    },
    displayManageGroupDialog: function(subject){
        store.dispatch(actions.setManageGroupsDialogVisibility(true, subject));

        getAllGroups().then(function(result){
          var groups = JSON.parse(result.data.Data);
          store.dispatch(groupsActions.getGroupsSuccess(groups));
        });
    },
    hideManageGroupDialog: function(){
        store.dispatch(actions.setManageGroupsDialogVisibility(false));
    },
    displayTaskDialog: function(id){
        store.dispatch(actions.setTaskDialogVisibility(true, id));
    },
    hideTaskDialog: function(){
        store.dispatch(actions.setTaskDialogVisibility(false));
    },
    addSubject: function(e){
        e.preventDefault();
        var subjectName = e.target.elements.subjectName.value;
        var newSubject = {
            Name: subjectName
        };
        addSubject(newSubject)
        .then(function(response){
            store.dispatch(actions.addSubjectSuccess(JSON.parse(response.data.Data)))
        });
    },
    addTask: function(e){
        e.preventDefault();
        var taskName = e.target.elements.taskName.value;
        var taskDescription = e.target.elements.taskDescription.value;
        var newTask = {
            Name: taskName,
            Description: taskDescription,
            SubjectId: this.props.currentSubjectId
        };
        addTask(newTask)
        .then(function(response){
            store.dispatch(actions.addTaskSuccess(JSON.parse(response.data.Data)))
        });
    },
    deleteSubject: function(){
        var subjectId = this.props.currentSubjectId;
        deleteSubjectById(subjectId)
        .then(function(response){
            store.dispatch(actions.deleteSubjectSuccess(subjectId))
        });
    },
    assignSubjectGroup: function(subject, group){
      assignGroup(subject.Id, group.Id)
      .then(function(result){
        var groupId = group.Id;
        subject.AssignGroups.push(group);
        store.dispatch(groupsActions.assignGroupSuccess(subject));
      })
    },
    unassignSubjectGroup: function(subject, group){
      unassignGroup(subject.Id, group.Id)
      .then(function(result){
        subject.AssignGroups =
          subject.AssignGroups.filter((item) => item.Id !== group.Id);
        store.dispatch(groupsActions.unassignGroupSuccess(subject));
      })
    },
    render: function(){
        return (
            <SubjectsGrid
                subjects={this.props.subjects}
                groups={this.props.groups}
                subject={this.props.subject}

                getAddDialogDisplay={this.props.isAdding}
                getDeleteDialogDisplay={this.props.isDeleting}
                getTaskDialogDisplay={this.props.isTaskAdding}
                getManageGroupDialogDisplay={this.props.isGroupManaging}

                displayAddDialog={this.displayAddDialog}
                displayDeleteDialog={this.displayDeleteDialog}
                displayTaskDialog={this.displayTaskDialog}
                displayManageGroupsDialog={this.displayManageGroupDialog}

                hideAddDialog={this.hideAddDialog}
                hideDeleteDialog={this.hideDeleteDialog}
                hideTaskDialog={this.hideTaskDialog}
                hideManageGroupsDialog={this.hideManageGroupDialog}

                addSubject={this.addSubject}
                deleteSubject={this.deleteSubject}
                addTask={this.addTask}
                assignGroup={this.assignSubjectGroup}
                unassignGroup={this.unassignSubjectGroup}/>
        );
    }
});

const mapStateToProps = store => {
    return {
        subjects: store.subjectsState.subjects,
        isTaskAdding: store.subjectsState.isTaskAdding,
        isAdding: store.subjectsState.isAdding,
        isDeleting: store.subjectsState.isDeleting,
        currentSubjectId: store.subjectsState.currentSubjectId,
        isGroupManaging: store.subjectsState.isGroupManaging,
        subject: store.subjectsState.subject,
        groups: store.subjectsState.groups
    };
};

export default connect(mapStateToProps)(SubjectListContainer);
