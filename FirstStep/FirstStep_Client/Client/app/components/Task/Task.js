import React from 'react'
import styles from './styles.css'
import { Button, Panel} from 'react-bootstrap'
import { Link } from 'react-router'

export default function (props){
        var link = "/task/" + props.task.Id;
        return(
        <Panel className={styles.container} header={props.task.Name} eventKey={props.task.Id} >
               {props.task.Description}
          <div>
            <Link className="btn btn-default" to={link}>...</Link>
          </div>
        </Panel>
        );
};
