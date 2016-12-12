import React from 'react';
import { renderTextBox } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'
import GroupItem from '../GroupItem/GroupItem'

export default function(props){
  return (
    <div>
    {props.roles.map((item) =>
      <GroupItem
        key={item.Id}
        group={item}
        handleAdd={() => props.handleAdd(props.user, item)}
        handleDelete={() => props.handleDelete(props.user, item)}
        isAssigned={props.user && props.user.RolesIds && props.user.RolesIds.some((ag) => ag === item.Id)}/>
    )}
    </div>
  )
}
