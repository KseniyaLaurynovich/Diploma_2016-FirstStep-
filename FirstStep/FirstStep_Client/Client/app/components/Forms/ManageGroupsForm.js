import React from 'react';
import { renderTextBox } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'
import GroupItem from '../GroupItem/GroupItem'

export default function(props){
  return (
    <div>
    {props.groups.map((item) =>
      <GroupItem
        key={item.Id}
        group={item}
        handleAdd={() => props.handleAdd(props.subject, item)}
        handleDelete={() => props.handleDelete(props.subject, item)}
        isAssigned={props.subject && props.subject.AssignGroups.some((ag) => ag.Id === item.Id)}/>
    )}
    </div>
  )
}
