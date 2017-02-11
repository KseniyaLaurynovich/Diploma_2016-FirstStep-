import React from 'react'
import { Modal, Button, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col, Form } from 'react-bootstrap'

function filteredRoles(props){
  return props.roles
  .filter((role) => {
    return props.user && props.user.roles.indexOf(role.name) == -1
  })
}

function addRole(props, role){
  var roles = props.user.roles
  roles.push(role.name)

  props.handleRolesChanges(roles)
}

function removeRole(props, role){
  var index = props.user.roles.indexOf(role)
  if(index != -1){
    var roles = props.user.roles
    roles.splice(index, 1)

    props.handleRolesChanges(roles)
  }
}

const UserEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title>Edit user</Modal.Title>
     </Modal.Header>

   <Form onSubmit={props.submit}>
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

         <FormGroup controlId="email">
           <FormControl type="email" required placeholder='Email'
             defaultValue={props.user && props.user.email}
             onChange={props.handleEmailChange}/>
         </FormGroup>

         <hr/>

         <h4>Roles</h4>
         <Row>
           {
             props.user && props.user.roles.map((role, index) => (
               <Col xs={12} md={4} key={index}>
                 <h4>{role}</h4>
                 <Button onClick={() => removeRole(props, role)}>Remove</Button>
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
                   <MenuItem onClick={() => addRole(props, role)} key={index}>
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
         <Button type="submit" bsStyle="success">Save changes</Button>
       </Modal.Footer>
     </Form>
   </Modal>
)

export default UserEditFormView
