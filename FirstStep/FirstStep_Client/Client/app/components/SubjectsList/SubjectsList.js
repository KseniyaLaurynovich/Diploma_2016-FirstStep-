var React = require('react');
var Subject = require('../Subject/Subject');

function SubjectsList(props){
        return (
            <div className="mdl-grid portfolio-max-width">
                {props.subjects.map((subject) => <Subject key={subject.Id} subject={subject}/>)}
            </div>
        );
};

module.exports = SubjectsList;
