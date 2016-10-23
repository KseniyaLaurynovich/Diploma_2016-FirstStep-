var React = require('react');
var SubjectsList = require('../components/SubjectsList/SubjectsList');
var subjectsHelper = require('../utils/subjectsHelper');

var SubjectListContainer = React.createClass({
    getInitialState: function(){
        return {
            subjects: []
        };
    },
    componentWillMount: function(){
        subjectsHelper.getSubjectsForUser(1).then(function(result){
            this.setState({
                subjects: result
            });
        }.bind(this));
    },
    render: function(){
        return (
            <SubjectsList subjects={this.state.subjects}/>
        );
    }
});

module.exports = SubjectListContainer;
