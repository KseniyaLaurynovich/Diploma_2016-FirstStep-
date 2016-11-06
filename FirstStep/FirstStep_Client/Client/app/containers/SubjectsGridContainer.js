import React from 'react';
import SubjectsGrid from '../components/SubjectsGrid/SubjectsGrid';
import { connect } from 'react-redux';
import { getSubjectsForUser, addSubject, deleteSubjectById } from '../utils/subjectsHelper';
import { setAddDialogVisibility, setDeleteDialogVisibility } from '../actions/SubjectsActions';
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
    addSubject: function(e){
        e.preventDefault();
        var subjectName = e.target.elements.subjectName.value;
        var newSubject = {
            UserId: 'f20d4514-88a1-4200-be97-4dbe56a3832b',
            Name: subjectName
        };
        addSubject(newSubject);
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
                displayAddDialog={this.displayAddDialog}
                displayDeleteDialog={this.displayDeleteDialog}
                hideAddDialog={this.hideAddDialog}
                hideDeleteDialog={this.hideDeleteDialog}

                addSubject={this.addSubject}
                deleteSubject={this.deleteSubject}/>
        );
    }
});

const mapStateToProps = store => {
    return {
        subjects: store.subjectsState.subjects,
        isAdding: store.subjectsState.isAdding,
        isDeleting: store.subjectsState.isDeleting,
        currentSubjectId: store.subjectsState.currentSubjectId
    };
};

export default connect(mapStateToProps)(SubjectListContainer);
