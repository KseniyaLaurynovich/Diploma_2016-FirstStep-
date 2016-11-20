import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './styles.css';

export default function(props){
    return(
      <Modal show={props.modalIsOpen} onHide={props.close}>
       <Modal.Header closeButton>
         <Modal.Title>{props.header}</Modal.Title>
       </Modal.Header>
       <Modal.Body>
             {props.children}
       </Modal.Body>
       </Modal>
    );
}
