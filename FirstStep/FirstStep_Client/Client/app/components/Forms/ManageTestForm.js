import React from 'react';
import { renderTextBox, renderSwitch, renderTextArea } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import GroupItem from '../GroupItem/GroupItem'

export default function(props){
    function FieldGroup({ id, name, label, help, type }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl name={name} type="file" />
      </FormGroup>
    );
  }
  const { handleSubmit, pristine, handleCancel, submitting, onTestTypeChange, isFile } = props
  return (
    <form onSubmit={handleSubmit}>
    <Field name="Name" type="text" component={renderTextBox} label="Name: " />
    <Checkbox name="IsFile" onChange={onTestTypeChange}>
      is files
    </Checkbox>
    {
      isFile
      ?   <FieldGroup id="InputFile" name="InputFile" type="file" label="Input file"/>
      : ""
    }
    {
      isFile
      ?   <FieldGroup id="OutputFile" name="OutputFile" type="file" label="Output file"/>
      : ""
    }
    {
      !isFile
      ?   <Field name="InputArguments" component={renderTextArea} label="Input arguments: "/>
      : ""
    }
    {
      !isFile
      ?     <Field name="OutputArguments" component={renderTextArea} label="Output arguments"/>
      : ""
    }
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}
