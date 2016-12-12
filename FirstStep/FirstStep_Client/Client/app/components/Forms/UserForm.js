import React from 'react';
import { renderTextBox } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

export default function(props) {
 const { handleSubmit, pristine, handleCancel, submitting, user } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="Email" type="text" component={renderTextBox} label="Email: " value={user != null && user.Email}/>
      <Field name="FirstName" type="text" component={renderTextBox} label="First name: " value={user != null && user.FirstName}/>
      <Field name="LastName" type="text" component={renderTextBox} label="Last name: " value={user != null && user.LastName}/>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}
