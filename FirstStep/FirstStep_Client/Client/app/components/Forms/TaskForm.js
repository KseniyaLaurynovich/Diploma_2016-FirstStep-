import React from 'react'
import {renderTextBox, renderTextArea} from './Fields'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'

const validate = values => {
  const errors = {}
  if (!values.taskName || values.taskName == '') {
    errors.taskName = 'Task name is required'
  }
  if (!values.taskDescription || values.taskDescription == '') {
    errors.taskDescription = 'Description is required'
  }
  return errors;
}

const taskForm = (props) => {
 const { handleSubmit, pristine, handleCancel, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="taskName" type="text" component={renderTextBox} label="Name: "/>
      <Field name="taskDescription" component={renderTextArea} label="Description: "/>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'taskForm',
  validate
})(taskForm)
