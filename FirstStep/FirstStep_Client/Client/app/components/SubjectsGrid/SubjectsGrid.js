import React from 'react';
import Subject from '../Subject/Subject';
import AddButton from '../AddButton/AddButton';
import Modal from 'react-modal';
import styles from './styles.css';

export default function (props){
        return (
            <div>
                <AddButton click={props.openAddDialog}/>
                <div className="mdl-grid portfolio-max-width">
                    {props.subjects.map((subject) => <Subject key={subject.Id} subject={subject}/>)}
                </div>
                <Modal
                  isOpen={props.isAdding}>
                  <h2>New subject</h2>
                  <form onSubmit={props.addSubject}>
                    <label>Subject name: </label>
                    <input type='text' name="subjectName"/>
                    <input type="submit" value="Save"/>
                    <input type="reset" onClick={props.closeAddDialog} value="Cancel"/>
                  </form>
                </Modal>
            </div>
        );
};
