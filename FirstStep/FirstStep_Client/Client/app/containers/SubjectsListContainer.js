import React from 'react';
import { connect } from 'react-redux';

import SubjectsList from '../components/SubjectsList/SubjectsList';
import { getSubjectsForUser } from '../utils/subjectsHelper';
import store from '../store';

var SubjectListContainer = React.createClass({
    componentWillMount: function(){
        getSubjectsForUser('f20d4514-88a1-4200-be97-4dbe56a3832b');
    },
    render: function(){
        return (
            <SubjectsList subjects={this.props.subjects}/>
        );
    }
});

const mapStateToProps = store => {
    return {
        subjects: store.subjectsState
    };
};

export default connect(mapStateToProps)(SubjectListContainer);
