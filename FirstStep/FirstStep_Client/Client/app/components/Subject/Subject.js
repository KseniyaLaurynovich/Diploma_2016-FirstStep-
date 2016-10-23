var React = require('react');
var Task = require('../Task/Task');
var styles = require('./styles.css')

function Subject(props){
    console.log(styles);
    return(
        <div className={styles.container}>
            <div className={styles.divider}>
                <div className={styles.divider_text}>
                    <span>{props.subject.Name}</span>
                    <span className={styles.divider_score}>{props.subject.Tasks.length}</span>
                </div>
            </div>
            {props.subject.Tasks.map((task) => <Task key={task.Id} task={task}/>)}
        </div>
    );
};

module.exports = Subject;
