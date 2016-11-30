import React from 'react'
import Task from '../Task/Task'
import styles from './styles.css'
import { Button, Panel, DropdownButton, MenuItem, ButtonGroup} from 'react-bootstrap'

export default function (props){
    return(
        <Panel className={styles.container} collapsible header={props.subject.Name} eventKey={props.subject.Id}>
            <ButtonGroup>
              <Button onClick={() => props.addTaskClick(props.subject.Id)}>
                  +
              </Button>
              <DropdownButton title="Groups" id="bg-nested-dropdown">
                <MenuItem>Manage</MenuItem>
                <MenuItem divider />
               {props.subject.AssignGroups.map((group) =>
                   <MenuItem disabled>{group.Name}</MenuItem>)}
              </DropdownButton>
              <Button onClick={() => props.deleteClick(props.subject.Id)}>
                  Delete
              </Button>
            </ButtonGroup>
            <div>
              {props.subject.Tasks
                && props.subject.Tasks.map((task) => <Task key={task.Id} task={task}/>)}
            </div>
        </Panel>
    );
};
