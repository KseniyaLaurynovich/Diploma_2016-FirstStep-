import React from 'react'
import { Button } from 'react-bootstrap'

export default function(props){
  return(
    <div>
      <div>
      <h2>{props.task && props.task.Name}</h2>
      </div>
      <div>
        <p>{props.task && props.task.Description}</p>
      </div>
      <div>
        <p>Created: { props.task && props.task.CreationDate }</p>
      </div>
      <Button bsSize="xsmall">Edit</Button>
      <Button bsSize="xsmall">Delete</Button>
    </div>
  );
}
