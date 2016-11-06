import React from 'react';
import Subject from '../Subject/Subject';
import Button from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import styles from './styles.css';
import SubjectForm from '../Forms/SubjectForm';
import DeleteForm from '../Forms/DeleteForm';

export default function (props){
        return (
            <div>
                <Button
                 className={styles.divider_text}
                 click={props.displayAddDialog}>Add</Button>
                <div className="mdl-grid portfolio-max-width">
                    {props.subjects.map((subject) =>
                        <Subject
                        key={subject.Id}
                        subject={subject}
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
                    Do you really want to delete this subject ?
                  </DeleteForm>
                </Dialog>
            </div>
        );
};
