import React from 'react'
import styles from './styles.css'
import { Button, Panel} from 'react-bootstrap'

export default function (props){
        return(
        <Panel className={styles.container} header={props.task.Name} eventKey={props.task.Id} >
             {props.task.Description}
          <div>
            <Button>
              More
             </Button>
          </div>
        </Panel>
        );
};
