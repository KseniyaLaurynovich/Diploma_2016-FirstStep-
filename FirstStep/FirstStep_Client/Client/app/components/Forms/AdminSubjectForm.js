import React from 'react';
import { renderTextBox, renderDropdown } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

export default function(props) {
 const { handleSubmit, pristine, handleCancel, submitting, options } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="Name" type="text" component={renderTextBox} label="Name: " />
      <Field name="UserId" type="text" component={renderDropdown} label="User: " options={options}/>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}
