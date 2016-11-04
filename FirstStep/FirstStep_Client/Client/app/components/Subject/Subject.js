import React from 'react';
import Task from '../Task/Task';
import styles from './styles.css';

export default function (props){
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
