import React from 'react';
import Modal from 'react-modal';
import styles from './styles.css';

export default function(props){
    return(
        <Modal
         isOpen={props.modalIsOpen}
         portalClassName={styles.dialog}>
             {props.children}
       </Modal>
    );
}
