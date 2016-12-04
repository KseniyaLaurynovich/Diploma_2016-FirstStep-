import React from 'react'
import { Button, ListGroupItem, ButtonGroup } from 'react-bootstrap'

export default function(props){
  return(
    <ListGroupItem>
      <div xs={12} md={8}>{props.group.Name}</div>
      <ButtonGroup xs={6} md={4} bsSize="xsmall">
          <Button
            disabled={props.isAssigned?true:false}
            onClick={props.handleAdd}>+</Button>
          <Button
            disabled={props.isAssigned?false:true}
            onClick={props.handleDelete}>-</Button>
      </ButtonGroup>
    </ListGroupItem>
  );
}
