import React from 'react'
import store from '../store'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions/TasksActions'
import * as adminHelper from '../utils/adminHelper'
import ManagingTable from '../components/ManagingTable/ManagingTable'
import Dialog from '../components/Dialog/Dialog'
import DeleteForm from '../components/Forms/DeleteForm'
import TaskFormContainer from './TaskFormContainer'

var TasksManagingContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentWillMount: function(){
    adminHelper.getAllTasks().then(function(response){
        var tasks = JSON.parse(response.data.Data)
                    .map(function(task){
                      return{
                        Id : task.Id,
                        Name: task.Name,
                        Description : task.Description,
                        SubjectId : task.Subject.Id,
                        SubjectName : task.Subject.Name,
                        UserId : task.Subject.User.Id,
                        UserName : `${task.Subject.User.FirstName} ${task.Subject.User.LastName} (${task.Subject.User.Email})`
                      }
                    });
        store.dispatch(actions.getTasksSuccess(tasks));
    });
    adminHelper.getAllUsers().then(function(response){
      var teachers = response.data
                      .filter((user) => user.Roles.some((role) => role.Name === "Teacher"))
                      .map(function(user){ return{Key: user.Id, Value: `${user.FirstName} ${user.LastName} (${user.Email})`}})
      store.dispatch(actions.getAllTeachesSuccess(teachers))
    })
    adminHelper.getAllSubjects().then(function(response){
      var subjects = JSON.parse(response.data.Data)
                      .map(function(subject){ return{Key: subject.Id, Value: subject.Name, UserId: subject.User.Id}})
      store.dispatch(actions.getAllSubjectsSuccess(subjects))
    })
  },
  displayAddDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(true))
  },
  hideAddTaskDialog: function(){
    store.dispatch(actions.setAddDialogVisibility(false))
  },
  displayEditDialog: function(task){
    store.dispatch(actions.setEditDialogVisibility(true, task))
  },
  hideEditTaskDialog: function(){
    store.dispatch(actions.setEditDialogVisibility(false, null))
  },
  displayDeleteDialog: function(task){
    store.dispatch(actions.setDeleteDialogVisibility(true, task))
  },
  hideDeleteTaskDialog: function(){
    store.dispatch(actions.setDeleteDialogVisibility(false, null))
  },
  handleAdding: function(e){
    e.preventDefault();

    var task = {
      Name: e.target.elements.Name.value,
      SubjectId: e.target.elements.SubjectId.value,
      Description: e.target.elements.Description.value
    }

    adminHelper.saveTask(task).then(function(response){
      var parsedResponse = JSON.parse(response.data.Data);
      var task = {
        Id : parsedResponse.Id,
        Name: parsedResponse.Name,
        Description : parsedResponse.Description,
        SubjectId : parsedResponse.Subject.Id,
        SubjectName : parsedResponse.Subject.Name,
        UserId : parsedResponse.Subject.User.Id,
        UserName : `${parsedResponse.Subject.User.FirstName} ${parsedResponse.Subject.User.LastName} (${parsedResponse.Subject.User.Email})`
      }
      store.dispatch(actions.addTaskSuccess(task))
    })
  },
  handleEditing: function(e){
    e.preventDefault();

    var task = {
      Name: e.target.elements.Name.value,
      SubjectId: e.target.elements.SubjectId.value,
      Description: e.target.elements.Description.value
    }

    adminHelper.saveTask(task).then(function(response){
      var parsedResponse = JSON.parse(response.data.Data);
      var task = {
        Id : parsedResponse.Id,
        Name: parsedResponse.Name,
        Description : parsedResponse.Description,
        SubjectId : parsedResponse.Subject.Id,
        SubjectName : parsedResponse.Subject.Name,
        UserId : parsedResponse.Subject.User.Id,
        UserName : `${parsedResponse.Subject.User.FirstName} ${parsedResponse.Subject.User.LastName} (${parsedResponse.Subject.User.Email})`
      }
      store.dispatch(actions.editTaskSuccess(task))
    })
  },
  handleDeleting: function(e){
    e.preventDefault();
    var task = this.props.currentTask;
    adminHelper.deleteTask(task.Id).then(function(response){
      store.dispatch(actions.deleteTaskSuccess(task))
    })
  },
  render: function(){
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Button className="btn btn-primary" onClick={this.displayAddDialog}>Add task</Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ManagingTable
                items={this.props.tasks}
                fields={[
                  {Key:'Name', Value:'Name'},
                  {Key:'UserName', Value:'User name'},
                  {Key:'SubjectName', Value:'Subject'}]}
                actions={[
                  {Title: "Edit", Action: this.displayEditDialog},
                  {Title: "Delete", Action: this.displayDeleteDialog}
                ]}
              />
            </div>
          </div>
          </div>
        <Dialog
          modalIsOpen={this.props.isAdding}
          close={this.hideAddTaskDialog}
          header="Add task">
          <TaskFormContainer
          handleSubmit={this.handleAdding}/>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isEditing}
          close={this.hideEditTaskDialog}
          header="Edit task">
          <TaskFormContainer
          handleSubmit={this.handleEditing}/>
        </Dialog>
        <Dialog
          modalIsOpen={this.props.isDeleting}
          close={this.hideDeleteTaskDialog}
          header="Delete user">
          <DeleteForm
          handleOk={this.handleDeleting}>
          {"Do you really want to delete this task ?"}
          </DeleteForm>
        </Dialog>
      </div>
    );
  }
});

const mapStateToProps = store => {
    return {
        tasks: store.tasksManaging.tasks,
        currentTask: store.tasksManaging.currentTask,
        isAdding: store.tasksManaging.isAdding,
        isEditing: store.tasksManaging.isEditing,
        isDeleting: store.tasksManaging.isDeleting
    };
};

export default connect(mapStateToProps)(TasksManagingContainer)
