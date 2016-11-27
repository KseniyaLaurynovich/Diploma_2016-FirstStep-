import React from 'react'
import styles from './styles.css'
import { Link } from 'react-router'
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
  return errors;
}

const loginForm = (props) => {
  const { handleSubmit, pristine, handleCancel, submitting, error } = props
  return(
    <Panel className={styles.form}>
      <span>{error}</span>
      <form className={styles.login} onSubmit={handleSubmit}>
        <Field id="email" name="email" type="email" component={renderTextBox} label="Email:"/>
        <Field id="password" name="password" type="password" component={renderTextBox} label="Password:"/>
        <div>
          <Link className="btn btn-default" to='/registration'>Registration</Link>
          <input className="btn btn-default" type="submit" disabled={pristine || submitting} value="Login"/>
        </div>
      </form>
    </Panel>
  );
};

export default reduxForm({
  form: 'loginForm',
  validate
})(loginForm)
