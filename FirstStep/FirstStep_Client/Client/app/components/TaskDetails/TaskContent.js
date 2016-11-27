import React from 'react'
import { Button } from 'react-bootstrap'

export default function(props){
  return(
    <div>
      <div>
      <h2>{props.task && props.task.Name}</h2>
        <Button bsSize="xsmall">Edit</Button>
      </div>
      <div>
        <p>{props.task && props.task.Description}</p>
        <Button bsSize="xsmall">Edit</Button>
      </div>
      <div>
        <p>Created: { props.task && props.task.CreationDate }</p>
      </div>
    </div>
  );
}
