import React from 'react';
import Task from '../Task/Task';
import Button from '../Button/Button';
import styles from './styles.css';

export default function (props){
    return(
        <div className={styles.container}>
            <div className={styles.divider + " " + props.className}>
                <div className={styles.divider_text}>
                    <span>{props.subject.Name}</span>
                    <span className={styles.divider_score}>
                        {props.subject.Tasks ? props.subject.Tasks.length : 0}
                    </span>
                    <Button
                     className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
                     relatedId={props.subject.Id}
                     onClick={props.addTaskClick}>
                         <i className="material-icons">add</i>
                     </Button>
                   <Button
                    className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
                    relatedId={props.subject.Id}
                    onClick={props.deleteClick}>
                        <i className="material-icons">clear</i>
                    </Button>
                </div>
            </div>
            <div>
              {props.subject.Tasks && props.subject.Tasks.map((task) => <Task key={task.Id} task={task}/>)}
            </div>
        </div>
    );
};
