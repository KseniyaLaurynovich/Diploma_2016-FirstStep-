import React from 'react'
import { Modal, Button, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap'

const UserEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title>Edit user</Modal.Title>
     </Modal.Header>

     <Modal.Body>
       <h3>Profile</h3>

       <FormGroup controlId="firstName">
         <FormControl type="text" required placeholder='First name'
           defaultValue={props.user && props.user.firstName}
           onChange={props.handleFirstNameChange}/>
       </FormGroup>

       <FormGroup controlId="lastName">
         <FormControl type="text" required placeholder='Last name'
           defaultValue={props.user && props.user.lastName}
           onChange={props.handleLastNameChange}/>
       </FormGroup>

       <FormGroup controlId="patronymic">
         <FormControl type="text" required placeholder='Patronymic'
           defaultValue={props.user && props.user.patronymic}
           onChange={props.handlePatronymicChange}/>
       </FormGroup>

       <hr/>

       <h3>Roles</h3>
       <Row>
         {
           props.user && props.user.roles.map((role) => (
             <Col xs={8} md={4} key='role'>
               <h4>{role}</h4>
               <span className="form-control-feedback glyphicon glyphicon-remove">
               </span>
             </Col>
           ))
         }
       </Row>
       <Row>
         <Col xs={8} md={4}>
           <DropdownButton title="Dropdown" id="bg-nested-dropdown">
             <MenuItem eventKey="1">Dropdown link</MenuItem>
             <MenuItem eventKey="2">Dropdown link</MenuItem>
           </DropdownButton>
         </Col>
       </Row>
     </Modal.Body>

     <Modal.Footer>
       <Button onClick={props.close}>Close</Button>
       <Button bsStyle="success">Save changes</Button>
     </Modal.Footer>

   </Modal>
)

export default UserEditFormView
