import React from 'react';
import { renderTextBox } from './Fields';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

const validate = values => {
  const errors = {}
  if (!values.subjectName || values.subjectName == '') {
    errors.subjectName = 'Subject name is required'
  }
  return errors;
}

const subjectForm = (props) => {
 const { handleSubmit, pristine, handleCancel, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="subjectName" type="text" component={renderTextBox} label="Subject name: "/>
      <div>
        <Button type="submit" disabled={pristine || submitting}>Save</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'subjectFrom',
  validate
})(subjectForm)
