import React from 'react'
import Task from '../Task/Task'
import styles from './styles.css'
import { Button, Panel} from 'react-bootstrap'

export default function (props){
    return(
        <Panel className={styles.container} collapsible header={props.subject.Name} eventKey={props.subject.Id}>
            <Button onClick={() => props.addTaskClick(props.subject.Id)}>
                +
            </Button>
            <Button onClick={() => props.deleteClick(props.subject.Id)}>
                -
            </Button>
            <div>
              {props.subject.Tasks
                && props.subject.Tasks.map((task) => <Task key={task.Id} task={task}/>)}
            </div>
        </Panel>
    );
};
