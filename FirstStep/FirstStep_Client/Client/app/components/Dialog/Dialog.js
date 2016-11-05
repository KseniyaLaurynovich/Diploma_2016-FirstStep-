import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function(props){
    return(
        <Modal
         isOpen={props.modalIsOpen}
         style={customStyles}
         contentLabel="Example Modal">
         {props.children}
       </Modal>
    );
}
