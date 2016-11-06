import React from 'react';
import Task from '../Task/Task';
import Button from '../Button/Button';
import styles from './styles.css';

export default function (props){
    return(
        <div className={styles.container}>
            <div className={styles.divider}>
                <div className={styles.divider_text}>
                    <span>{props.subject.Name}</span>
                    <span className={styles.divider_score}>
                        {props.subject.Tasks ? props.subject.Tasks.length : 0}
                    </span>
                   <Button
                    className={styles.divider_text}
                    relatedId={props.subject.Id}
                    click={props.deleteClick}>Delete</Button>
                </div>
            </div>
            {props.subject.Tasks && props.subject.Tasks.map((task) => <Task key={task.Id} task={task}/>)}
        </div>
    );
};
