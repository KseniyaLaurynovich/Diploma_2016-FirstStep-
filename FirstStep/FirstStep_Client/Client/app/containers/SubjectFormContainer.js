import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import store from '../store'
import SubjectForm from '../components/Forms/AdminSubjectForm'

const validate = values => {
  const errors = {}
  if (!values.Name || values.Name == '') {
    errors.Name = 'Name is required'
  }
  if (!values.UserId || values.UserId == '') {
    errors.UserId = 'User is required'
  }
  return errors;
}

const userForm = React.createClass({
  render: function(){
  return(
    <SubjectForm
      handleSubmit={this.props.handleSubmit}
      pristine={this.props.pristine}
      handleCancel={this.props.handleCancel}
      submitting={this.props.submitting}
      options={this.props.users}
    />
  )
  }
});

const mapStateToProps = store => {
    return {
        users: store.subjectsManaging.teachers,
        initialValues: store.subjectsManaging.currentSubject
    };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'userForm',
  validate
})(userForm))
