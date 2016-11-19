import React from 'react'
import { renderTextBox } from '../Forms/Fields'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username || values.username == '') {
    errors.username = 'User name is required'
  }
  if(!values.password || values.password == ''){
    errors.password = 'Password is required'
  }

  if(!values.confirmPassword || values.confirmPassword == ''){
    errors.confirmPassword = 'Password is required'
  }

  if(values.confirmPassword != values.password){
    errors.confirmPassword = 'Confirm does not match password'
  }
  return errors;
}

const registrationForm = (props) => {
  const { handleSubmit, pristine, handleCancel, submitting } = props
  return(
    <form onSubmit={handleSubmit}>
      <Field name="email"
        type="email"
        component={renderTextBox}
        label="Email:" value={props.username}/>
      <Field name="password" type="password" component={renderTextBox} label="Password:" value={props.password}/>
      <Field name="confirmPassword" type="password" component={renderTextBox} label="Confirm password:" value={props.confirmPassword}/>

      <div>
        <button type="submit" disabled={pristine || submitting}>Sign up</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'registrationForm',
  validate
})(registrationForm)
