import React from 'react'
import styles from './styles.css'
import { renderTextBox } from '../Forms/Fields'
import { Field, reduxForm } from 'redux-form'
import { Button, Panel } from 'react-bootstrap'

const validate = values => {
  const errors = {}
  if (!values.email || values.email == '') {
    errors.email = 'Email is required'
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
  const { handleSubmit, pristine, handleCancel, submitting, error } = props
  return(
    <Panel className={styles.form}>
      <form onSubmit={handleSubmit}>
        {error && <span>{error}</span>}
        <Field name="email"
          type="email"
          component={renderTextBox}
          label="Email:"/>
        <Field name="password" type="password" component={renderTextBox} label="Password:" value={props.password}/>
        <Field name="confirmPassword" type="password" component={renderTextBox} label="Confirm password:" value={props.confirmPassword}/>
        <div>
          <Button type="submit" disabled={pristine || submitting}>Sign up</Button>
        </div>
      </form>
    </Panel>
  );
};

export default reduxForm({
  form: 'registrationForm',
  validate
})(registrationForm)
