import React from 'react';
import { renderTextBox, renderDropdown, renderTextArea } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

export default function(props) {
 const { handleSubmit, pristine, handleCancel, submitting, users, subjects, onUserChange } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="UserId" type="text" component={renderDropdown} label="User: " options={users}/>
      <Field name="SubjectId" type="text" component={renderDropdown} label="Subject: " options={subjects}/>
      <Field name="Name" type="text" component={renderTextBox} label="Name: " />
      <Field name="Description" type="text" component={renderTextArea} label="Description: " />
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}
