import React from 'react';
import SubjectsGrid from '../components/SubjectsGrid/SubjectsGrid';
import { connect } from 'react-redux';
import store from '../store';
import { getSubjectsForUser, addSubject, deleteSubjectById, addTask } from '../utils/subjectsHelper';
import * as actions from '../actions/SubjectsGridActions';

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
        deleteSubjectById(this.props.currentSubjectId)
        .then(function(response){
            store.dispatch(actions.deleteSubjectSuccess(subjectId))
        });
    },
    render: function(){
        return (
            <SubjectsGrid
                subjects={this.props.subjects}

                getAddDialogDisplay={this.props.isAdding}
                getDeleteDialogDisplay={this.props.isDeleting}
                getTaskDialogDisplay={this.props.isTaskAdding}

                displayAddDialog={this.displayAddDialog}
                displayDeleteDialog={this.displayDeleteDialog}
                displayTaskDialog={this.displayTaskDialog}

                hideAddDialog={this.hideAddDialog}
                hideDeleteDialog={this.hideDeleteDialog}
                hideTaskDialog={this.hideTaskDialog}

                addSubject={this.addSubject}
                deleteSubject={this.deleteSubject}
                addTask={this.addTask}/>
        );
    }
});

const mapStateToProps = store => {
    return {
        subjects: store.subjectsState.subjects,
        isTaskAdding: store.subjectsState.isTaskAdding,
        isAdding: store.subjectsState.isAdding,
        isDeleting: store.subjectsState.isDeleting,
        currentSubjectId: store.subjectsState.currentSubjectId
    };
};

export default connect(mapStateToProps)(SubjectListContainer);
