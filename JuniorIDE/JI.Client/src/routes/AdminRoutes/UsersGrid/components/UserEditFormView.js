import React from 'react'
import _ from 'lodash'
import { ControlLabel, Modal, Button, FormGroup, FormControl, DropdownButton, MenuItem, Row, Col, Form, Glyphicon, HelpBlock, Checkbox } from 'react-bootstrap'

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

function filteredGroups(props){
  return props.groups
  .filter((group) => {
    return props.user && _.findIndex(props.user.groups, function(g){
      return g.id == group.id
    }) == -1
  })
}

function addGroup(props, group){
  var groups = props.user.groups || []
  groups.push(group)

  props.handleGroupsChanges(groups)
}

function removeGroup(props, group){
  var index = props.user.groups.indexOf(group)
  if(index != -1){
    var groups = props.user.groups
    groups.splice(index, 1)

    props.handleGroupsChanges(groups)
  }
}

const UserEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title className='modal-title'>Edit user</Modal.Title>
      
     </Modal.Header>

    <Row className='p-15'>
      <Col md={6} sm={6} xs={6}>
        <Checkbox onChange={props.handleDeleteConfirmation}>I undestand that user can not be restored.</Checkbox>
      </Col>
      <Col md={6} sm={6} xs={6}>
        <Button onClick={props.handleDelete}
          disabled={!props.deleteConfirmed || props.saveUserLoading || props.deleteUserLoading} bsStyle='danger' className='pull-right'>
          {
            props.deleteUserLoading
            ? 'Deleting...'
            : 'Delete this user'
          }
        </Button>
      </Col>
    </Row>

   <Form onSubmit={props.submit}>
     <Modal.Body>
       <h4>Profile</h4>
         <FormGroup controlId="firstName">
           <ControlLabel>First name</ControlLabel>
           <FormControl type="text" required
             defaultValue={props.user && props.user.firstName}
             onChange={props.handleFirstNameChange}/>
         </FormGroup>

         <FormGroup controlId="lastName">
           <ControlLabel>Last name</ControlLabel>
           <FormControl type="text" required
             defaultValue={props.user && props.user.lastName}
             onChange={props.handleLastNameChange}/>
         </FormGroup>

         <FormGroup controlId="patronymic">
           <ControlLabel>Patronymic</ControlLabel>
           <FormControl type="text" required 
             defaultValue={props.user && props.user.patronymic}
             onChange={props.handlePatronymicChange}/>
         </FormGroup>

         <FormGroup controlId="email">
           <ControlLabel>Email</ControlLabel>
           <FormControl type="email" required
             defaultValue={props.user && props.user.email}
             onChange={props.handleEmailChange}/>
         </FormGroup>

         <hr/>
        <Row>
          <Col md={6} sm={12} xs={12}>
             <h4>Roles</h4>
             {
               props.user && props.user.roles.map((role, index) => (
                 <Row key={index}>
                   <Col md={8} sm={6} xs={6}>
                     <p className='modal-title margin-right-10-px'>{role}</p>
                   </Col>

                   <Col md={4} sm={6} xs={6}>
                     <Glyphicon className='glypicon--button glypicon-sm' glyph='remove'
                       onClick={() => removeRole(props, role)}/>
                   </Col>
                 </Row>
               ))
             }
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
           </Col>

           <Col md={6} sm={12} xs={12}>
             <h4>Groups</h4>
             {
               props.user && props.user.groups.map((group, index) => (
                 <Row key={index}>
                   <Col md={8} sm={6} xs={6}>
                     <p className='modal-title margin-right-10-px'>{group.name}</p>
                   </Col>

                   <Col md={4} sm={6} xs={6}>
                     <Glyphicon className='glypicon--button glypicon-sm' glyph='remove'
                       onClick={() => removeGroup(props, group)}/>
                   </Col>
                 </Row>
               ))
             }
             <Row>
               <Col xs={8} md={4}>
                 <DropdownButton
                   disabled={!props.user || filteredGroups(props).length == 0}
                   title="Add group"
                   id="bg-nested-dropdown">
                   {
                     props.groups && filteredGroups(props).map((group, index) => (
                       <MenuItem onClick={() => addGroup(props, group)} key={index}>
                         { group.name }
                       </MenuItem>
                     ))
                   }
                 </DropdownButton>
               </Col>
             </Row>
           </Col>
         </Row>
       </Modal.Body>

       <Modal.Footer>
          <FormGroup validationState='error' className='pull-left'>
             <HelpBlock>
               {
                  props.saveUserError != null
                    ? props.saveUserError
                    : ''
                }
              </HelpBlock>
          </FormGroup>
       <Button onClick={props.close}>Close</Button>
       <Button disabled={props.saveUserLoading || props.deleteUserLoading} type="submit" bsStyle="success">
           {
             props.saveUserLoading
             ? 'Saving...'
             : 'Save changes'
           }
       </Button>
       </Modal.Footer>
     </Form>
   </Modal>
)

export default UserEditFormView
