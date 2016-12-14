import React from 'react';
import { renderTextBox } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

export default function(props) {
 const { handleSubmit, pristine, handleCancel, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="Name" type="text" component={renderTextBox} label="Name: "/>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}
