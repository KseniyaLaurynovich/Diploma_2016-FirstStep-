import React from 'react';
import SubjectsGrid from '../components/SubjectsGrid/SubjectsGrid';
import { connect } from 'react-redux';
import { getSubjectsForUser, addSubject } from '../utils/subjectsHelper';
import { addSubjectStart, addSubjectEnd } from '../actions/SubjectsActions';
import store from '../store';

var SubjectListContainer = React.createClass({
    componentWillMount: function(){
        getSubjectsForUser('f20d4514-88a1-4200-be97-4dbe56a3832b');
    },
    openAddDialog: function(){
        store.dispatch(addSubjectStart());
    },
    closeAddDialog: function(){
        store.dispatch(addSubjectEnd());
    },
    addSubject: function(e){
        e.preventDefault();
        var newSubject = {
            UserId: 'f20d4514-88a1-4200-be97-4dbe56a3832b',
            Name: e.target.elements.subjectName.value
        };

        addSubject(newSubject);
    },
    render: function(){
        return (
            <SubjectsGrid
                subjects={this.props.subjects}
                openAddDialog={this.openAddDialog}
                closeAddDialog={this.closeAddDialog}
                addSubject={this.addSubject}
                isAdding={this.props.isAdding}
                subjectModal="Hello"/>
        );
    }
});

const mapStateToProps = store => {
    return {
        subjects: store.subjectsState.subjects,
        isAdding: store.subjectsState.isAdding
    };
};

export default connect(mapStateToProps)(SubjectListContainer);
