import React from 'react'
import Subject from '../Subject/Subject'
import Dialog from '../Dialog/Dialog'
import styles from './styles.css'
import SubjectForm from '../Forms/SubjectForm'
import DeleteForm from '../Forms/DeleteForm'
import TaskForm from '../Forms/TaskForm'
import { Button, Accordion } from 'react-bootstrap'


export default function (props){
        return (
            <div>
                <Button onClick={props.displayAddDialog}>+</Button>
                <Accordion>
                    {props.subjects.map((subject) =>
                        <Subject
                        key={subject.Id}
                        subject={subject}
                        addTaskClick={props.displayTaskDialog}
                        deleteClick={props.displayDeleteDialog}/>)}
                </Accordion>
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
