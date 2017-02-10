import React from 'react'
import { Modal, Button, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap'

function filteredRoles(props){
  return props.roles
  .filter((role) => {
    return props.user && props.user.roles.indexOf(role.name) == -1
  })
}

const UserEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title>Edit user</Modal.Title>
     </Modal.Header>

     <Modal.Body>
       <h4>Profile</h4>

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

       <h4>Roles</h4>
       <Row>
         {
           props.user && props.user.roles.map((role, index) => (
             <Col xs={8} md={4} key={index}>
               <h4>{role}</h4>
               <span className="form-control-feedback glyphicon glyphicon-remove"
                  onClick={() => alert("fdsfad")}>
               </span>
             </Col>
           ))
         }
       </Row>
       <Row>
         <Col xs={8} md={4}>
           <DropdownButton
             disabled={!props.user || filteredRoles(props).length == 0}
             title="Add role"
             id="bg-nested-dropdown">
             {
               props.roles && filteredRoles(props).map((role, index) => (
                 <MenuItem onClick={() => props.addRole(role)} key={index}>
                   { role.name }
                 </MenuItem>
               ))
             }
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
