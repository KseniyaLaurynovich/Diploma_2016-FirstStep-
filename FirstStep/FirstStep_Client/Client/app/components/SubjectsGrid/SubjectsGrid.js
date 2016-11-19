import React from 'react';
import Subject from '../Subject/Subject';
import Button from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import styles from './styles.css';
import SubjectForm from '../Forms/SubjectForm';
import DeleteForm from '../Forms/DeleteForm';
import TaskForm from '../Forms/TaskForm';


export default function (props){
        return (
            <div>
                <Button
                 className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                 onClick={props.displayAddDialog}>
                  <i className="material-icons">add</i>
                 </Button>
                <div className="mdl-list">
                    {props.subjects.map((subject) =>
                        <Subject
                        className="mdl-list__item"
                        key={subject.Id}
                        subject={subject}
                        addTaskClick={props.displayTaskDialog}
                        deleteClick={props.displayDeleteDialog}/>)}
                </div>
                <Dialog modalIsOpen={props.getAddDialogDisplay}>
                  <SubjectForm
                    handleSubmit={props.addSubject}
                    handleCancel={props.hideAddDialog} />
                </Dialog>
                <Dialog modalIsOpen={props.getDeleteDialogDisplay}>
                  <DeleteForm
                    handleOk={props.deleteSubject}
                    handleCancel={props.hideDeleteDialog} >
                    'Do you really want to delete this subject ?'
                  </DeleteForm>
                </Dialog>
                <Dialog modalIsOpen={props.getTaskDialogDisplay}>
                  <TaskForm
                    handleSubmit={props.addTask}
                    handleCancel={props.hideTaskDialog} />
                </Dialog>
            </div>
        );
};
