import React from 'react';
import SubjectsGrid from '../components/SubjectsGrid/SubjectsGrid';
import { connect } from 'react-redux';
import { getSubjectsForUser, addSubject, deleteSubjectById, addTask } from '../utils/subjectsHelper';
import { setAddDialogVisibility, setDeleteDialogVisibility, setTaskDialogVisibility } from '../actions/SubjectsGridActions';
import store from '../store';

var SubjectListContainer = React.createClass({
    componentWillMount: function(){
        getSubjectsForUser('f20d4514-88a1-4200-be97-4dbe56a3832b');
    },
    displayAddDialog: function(){
        store.dispatch(setAddDialogVisibility(true));
    },
    hideAddDialog: function(){
        store.dispatch(setAddDialogVisibility(false));
    },
    displayDeleteDialog: function(e){
        store.dispatch(setDeleteDialogVisibility(true, e.target.dataset.relatedId));
    },
    hideDeleteDialog: function(){
        store.dispatch(setDeleteDialogVisibility(false));
    },
    displayTaskDialog: function(e){
        store.dispatch(setTaskDialogVisibility(true, e.target.dataset.relatedId));
    },
    hideTaskDialog: function(){
        store.dispatch(setTaskDialogVisibility(false));
    },
    addSubject: function(e){
        e.preventDefault();
        var subjectName = e.target.elements.subjectName.value;
        var newSubject = {
            UserId: 'f20d4514-88a1-4200-be97-4dbe56a3832b',
            Name: subjectName
        };
        addSubject(newSubject);
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
        addTask(newTask);
    },
    deleteSubject: function(){
        deleteSubjectById(this.props.currentSubjectId);
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
