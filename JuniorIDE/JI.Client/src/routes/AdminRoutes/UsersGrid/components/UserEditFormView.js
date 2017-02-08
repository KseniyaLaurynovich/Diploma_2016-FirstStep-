import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const UserEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title>Modal title</Modal.Title>
     </Modal.Header>

     <Modal.Body>
       One fine body...
     </Modal.Body>

     <Modal.Footer>
       <Button>Close</Button>
       <Button bsStyle="primary">Save changes</Button>
     </Modal.Footer>

   </Modal>
)

export default UserEditFormView
