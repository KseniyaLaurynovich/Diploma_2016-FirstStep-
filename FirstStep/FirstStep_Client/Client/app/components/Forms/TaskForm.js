import React from 'react';
import {renderTextBox, renderTextArea} from './Fields';
import { Field, reduxForm } from 'redux-form';

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
      <h2>New task</h2>
      <Field name="taskName" type="text" component={renderTextBox} label="Name: "/>
      <Field name="taskDescription" component={renderTextArea} label="Description: "/>
      <div>
        <button type="submit" disabled={pristine || submitting}>Save</button>
        <button type="reset" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'taskForm',
  validate
})(taskForm)
