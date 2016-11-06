import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.subjectName || values.subjectName == '') {
    errors.subjectName = 'Subject name is required'
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const subjectForm = (props) => {
 const { handleSubmit, pristine, handleCancel, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <h2>New subject</h2>
      <Field name="subjectName" type="text" component={renderField} label="Subject name: "/>
      <div>
        <button type="submit" disabled={pristine || submitting}>Save</button>
        <button type="reset" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'subjectFrom',
  validate
})(subjectForm)
