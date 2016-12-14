import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import store from '../store'
import TestsForm from '../components/Forms/ManageTestForm'
import * as actions from '../actions/TasksActions'

const validate = values => {
  const errors = {}
  if (!values.Name || values.Name == '') {
    errors.Name = 'Name is required'
  }
  return errors;
}


const testForm = React.createClass({
  changeTestType: function(e){
    store.dispatch(actions.changeNewTestType())
  },
  render: function(){
  return(
    <TestsForm
      handleSubmit={this.props.handleSubmit}
      pristine={this.props.pristine}
      handleCancel={this.props.handleCancel}
      submitting={this.props.submitting}
      onTestTypeChange={this.changeTestType}
      isFile={this.props.isFile}
    />
  )
  }
});

const mapStateToProps = store => {
    return {
        initialValues: {},
        isFile: store.tasksManaging.isFile
    };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'testForm',
  validate
})(testForm))
