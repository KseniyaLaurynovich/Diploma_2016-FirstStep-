import React from 'react';
import Modal from 'react-modal';

const modalStyles = {
  content : {
      margin: '10px auto',
      border: '1px solid rgb(204, 204, 204)',
      background: 'rgb(255, 255, 255)',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
      width: '50%'
  }
};

export default function(props){
    return(
        <Modal
         isOpen={props.modalIsOpen}
         style={modalStyles}>
         {props.children}
       </Modal>
    );
}
