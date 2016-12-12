import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import store from '../store'
import UserForm from '../components/Forms/UserForm'

const validate = values => {
  const errors = {}
  if (!values.Email || values.Email == '') {
    errors.Email = 'Email is required'
  }
  if (!values.FirstName || values.FirstName == '') {
    errors.FirstName = 'First name is required'
  }
  if (!values.LastName || values.LastName == '') {
    errors.LastName = 'Last name is required'
  }
  return errors;
}

const userForm = React.createClass({
  render: function(){
  return(
    <UserForm
      handleSubmit={this.props.handleSubmit}
      pristine={this.props.pristine}
      handleCancel={this.props.handleCancel}
      submitting={this.props.submitting}
      user={this.props.user}
    />
  )
  }
});

const mapStateToProps = store => {
    return {
        initialValues: store.usersManaging.currentUser
    };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'userForm',
  validate
})(userForm))
