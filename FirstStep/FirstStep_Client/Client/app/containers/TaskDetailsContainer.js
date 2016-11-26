import React from 'react'
import TaskDetails from '../components/TaskDetails/TaskDetails'
import * as taskHelper from '../utils/tasksHelper'
import store from '../store'
import * as actions from '../actions/TasksActions'
import { connect } from 'react-redux'

var TaskDetailsContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentWillMount: function(){
    var taskId = this.props.params["taskId"];
    taskHelper.getTaskById(taskId)
    .then(function(response){
      var task = JSON.parse(response.data.Data);
      store.dispatch(actions.getTaskSuccess(task));
    })
  },
  render: function(){
    return(
      <TaskDetails task={this.props.task}/>
    );
  }
});

const mapStateToProps = store => {
    return {
        task: store.taskDetails.task
    };
};

export default connect(mapStateToProps)(TaskDetailsContainer);
