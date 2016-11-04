import React from 'react';
import Subject from '../Subject/Subject';

export default function (props){
        return (
            <div className="mdl-grid portfolio-max-width">
                {props.subjects.map((subject) => <Subject key={subject.Id} subject={subject}/>)}
            </div>
        );
};
