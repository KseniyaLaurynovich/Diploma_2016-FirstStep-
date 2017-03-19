import React from 'react'
import { Glyphicon, Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock, Checkbox, DropdownButton, MenuItem } from 'react-bootstrap'

function filteredGroups(props){
  return props.groups
  .filter((group) => {
    return props.subject && _.findIndex(props.subject.groups, function(g){
      return g.id == group.id
    }) == -1
  })
}

function addGroup(props, group){
  var groups = props.subject.groups || []
  groups.push(group)

  props.handleGroupsChanges(groups)
}

function removeGroup(props, group){
  var index = props.subject.groups.indexOf(group)
  if(index != -1){
    var groups = props.subject.groups
    groups.splice(index, 1)

    props.handleGroupsChanges(groups)
  }
}

const SubjectEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title className='modal-title'>
         {
           props.subject == null || !props.subject.id
           ? 'Create subject'
           : 'Edit subject'
         }
       </Modal.Title>
       {
         props.subject != null && props.subject.id
         ?     <Row>
                 <Col md={6} sm={6} xs={6}>
                   <Checkbox onChange={props.handleDeleteConfirmation}>
                     I undestand that subject can not be restored.
                   </Checkbox>
                 </Col>
                 <Col md={6} sm={6} xs={6}>
                   <Button onClick={props.handleDelete}
                     disabled={!props.deleteConfirmed
                              || props.saveSubjectLoading
                              || props.deleteSubjectLoading} bsStyle='danger' className='pull-right'>
                     {
                       props.deleteSubjectLoading
                       ? 'Deleting...'
                       : 'Delete this subject'
                     }
                   </Button>
                 </Col>
               </Row>
           : ''
         }
     </Modal.Header>

   <Form onSubmit={props.submit}>
     <Modal.Body>
       <FormGroup controlId="subjectName">
         <FormControl type="text" required placeholder='Name'
           defaultValue={props.subject && props.subject.name}
           onChange={props.handleSubjectNameChange}/>
       </FormGroup>
       <Row>
         <Col md={12} sm={12} xs={12}>
           <h4>Assign to groups</h4>
           {
             props.subject && props.subject.groups && props.subject.groups.map((group, index) => (
               <Row key={index}>
                 <Col md={4} sm={6} xs={6}>
                   <p className='modal-title margin-right-10-px'>{group.name}</p>
                 </Col>

                 <Col md={2} sm={6} xs={6}>
                   <Glyphicon className='glypicon--button glypicon-sm' glyph='remove'
                     onClick={() => removeGroup(props, group)}/>
                 </Col>
               </Row>
             ))
           }
           <Row>
             <Col xs={8} md={4}>
               <DropdownButton
                 disabled={!props.subject || filteredGroups(props).length == 0}
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
       <Row>
         <Col md={6} sm={12} xs={12}>
          <FormGroup validationState='error' className='modal-footer--error pull-right'>
             <HelpBlock>
               {
                  props.saveSubjectError != null
                    ? props.saveSubjectError
                    : ''
                }
              </HelpBlock>
            </FormGroup>
          </Col>
          <Col md={6} sm={12} xs={12}>
           <Button onClick={props.close}>Close</Button>
           <Button disabled={props.saveSubjectLoading} type="submit" bsStyle="success">
               {
                 props.saveSubjectLoading
                 ? 'Saving...'
                 : 'Save changes'
               }
           </Button>
        </Col>
       </Row>
     </Modal.Footer>
     </Form>
   </Modal>
)

export default SubjectEditFormView
