import React from 'react'
import Subject from '../Subject/Subject'
import Dialog from '../Dialog/Dialog'
import styles from './styles.css'
import SubjectForm from '../Forms/SubjectForm'
import DeleteForm from '../Forms/DeleteForm'
import TaskForm from '../Forms/TaskForm'
import ManageGroupsForm from '../Forms/ManageGroupsForm'
import { Button, Accordion } from 'react-bootstrap'


export default function (props){
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Button className="btn btn-primary" onClick={props.displayAddDialog}>Add subject</Button>
            </div>
          </div>
        </div>
      </div>
      {props.subjects.map((subject) =>
              <Subject
              key={subject.Id}
              groups={props.groups}
              subject={subject}
              manageGroupsClick={props.displayManageGroupsDialog}
              addTaskClick={props.displayTaskDialog}
              deleteClick={props.displayDeleteDialog}/>)}
      <Dialog
        modalIsOpen={props.getAddDialogDisplay}
        close={props.hideAddDialog}
        header="New subject">
        <SubjectForm
        handleSubmit={props.addSubject}/>
      </Dialog>
      <Dialog
        modalIsOpen={props.getDeleteDialogDisplay}
        close={props.hideDeleteDialog}
        header="Delere subject">
        <DeleteForm
        handleOk={props.deleteSubject}>
          {"Do you really want to delete this subject ?"}
        </DeleteForm>
      </Dialog>
      <Dialog
        modalIsOpen={props.getTaskDialogDisplay}
        close={props.hideTaskDialog}
        header="New task">
        <TaskForm
        handleSubmit={props.addTask}/>
      </Dialog>
      <Dialog
        modalIsOpen={props.getManageGroupDialogDisplay}
        close={props.hideManageGroupsDialog}
        header="Manage groups">
        <ManageGroupsForm
        subject={props.subject}
        groups={props.groups}
        handleAdd={props.assignGroup}
        handleDelete={props.unassignGroup}/>
      </Dialog>
    </div>
  );
};
