import React from 'react'
import styles from './styles.css'
import { Link } from 'react-router'
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
  return errors;
}

const loginForm = (props) => {
  const { handleSubmit, pristine, handleCancel, submitting } = props
  return(
    <form className={styles.login} onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderTextBox} label="Email:"/>
      <Field name="password" type="password" component={renderTextBox} label="Password:"/>
      <div>
        <Link to='/registration'>Registration</Link>
        <button type="submit" disabled={pristine || submitting}>Login</button>
      </div>

      <Link to="/">Home</Link>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm',
  validate
})(loginForm)
