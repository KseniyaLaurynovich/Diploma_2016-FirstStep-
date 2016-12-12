import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../actions/TasksActions'
import store from '../store'
import TaskForm from '../components/Forms/AdminTaskForm'

const validate = values => {
  const errors = {}
  if (!values.Name || values.Name == '') {
    errors.Name = 'Name is required'
  }
  if (!values.Description || values.Description == '') {
    errors.Description = 'Description is required'
  }
  if (!values.UserId || values.UserId == '') {
    errors.UserId = 'User is required'
  }
  if (!values.SubjectId || values.SubjectId == '') {
    errors.SubjectId = 'Subject is required'
  }
  return errors;
}

const taskAdminForm = React.createClass({
  onUserChange: function(e){
    store.dispatch(actions.userChange(e.target.value))
  },
  render: function(){
  return(
    <TaskForm
      handleSubmit={this.props.handleSubmit}
      pristine={this.props.pristine}
      handleCancel={this.props.handleCancel}
      submitting={this.props.submitting}
      users={this.props.users}
      subjects={this.props.subjects}
      onUserChange={this.onUserChange}
    />
  )
  }
});

const mapStateToProps = store => {
    return {
        users: store.tasksManaging.users,
        subjects: store.taskForm.subjects,
        filtered: store.taskForm.filteredSubjects,
        initialValues: store.tasksManaging.currentTask
    };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'taskAdminForm',
  validate
})(taskAdminForm))
