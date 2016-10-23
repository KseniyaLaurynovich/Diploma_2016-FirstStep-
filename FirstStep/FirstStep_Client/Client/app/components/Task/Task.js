var React = require('react');

function Task(props){
        return(
            <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div className="mdl-card__title">
                    <div className="mdl-card__title-text">
                        {props.task.Name}
                    </div>
                </div>
                <div className="mdl-card__supporting-text">
                    {props.task.Description}
                </div>
            </div>
        );
};

module.exports = Task;
