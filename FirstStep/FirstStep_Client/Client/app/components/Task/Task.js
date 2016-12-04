import React from 'react'
import styles from './styles.css'
import { Button, Panel} from 'react-bootstrap'
import { Link } from 'react-router'

export default function (props){
  console.log(props.task)
        var link = "/task/" + props.task.Id;
        return(
        <div className="col-md-4">
           <h1>{props.task.Name}</h1>
           <p>{props.task.Description}</p>
           <Link className="btn btn-primary" to={link}>More</Link>
         </div>
        );
};
