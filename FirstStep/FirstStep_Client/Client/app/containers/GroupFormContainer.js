import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import store from '../store'
import GroupForm from '../components/Forms/GroupForm'

const validate = values => {
  const errors = {}
  if (!values.Name || values.Name == '') {
    errors.Name = 'Name is required'
  }
  return errors;
}

const groupForm = React.createClass({
  render: function(){
  return(
    <GroupForm
      handleSubmit={this.props.handleSubmit}
      pristine={this.props.pristine}
      handleCancel={this.props.handleCancel}
      submitting={this.props.submitting}
    />
  )
  }
});

const mapStateToProps = store => {
    return {
        initialValues: store.groupsManaging.currentGroup
    };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'groupForm',
  validate
})(groupForm))
