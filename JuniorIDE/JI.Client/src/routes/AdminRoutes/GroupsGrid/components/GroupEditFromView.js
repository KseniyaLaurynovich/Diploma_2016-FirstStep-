import React from 'react'
import { Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock, Checkbox, ControlLabel } from 'react-bootstrap'

const GroupEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title className='modal-title'>
         {
           props.group == null || !props.group.id
           ? 'Create group'
           : 'Edit group'
         }
       </Modal.Title>
     </Modal.Header>

    {
      props.group != null && props.group.id
      ?     <Row className='p-15'>
              <Col md={6} sm={6} xs={6}>
                <Checkbox onChange={props.handleDeleteConfirmation}>
                  I undestand that group can not be restored.
                </Checkbox> 
              </Col>
              <Col md={6} sm={6} xs={6}>
                <Button onClick={props.handleDelete}
                  disabled={!props.deleteConfirmed
                          || props.saveGroupLoading
                          || props.deleteGroupLoading} bsStyle='danger' className='pull-right'>
                  {
                    props.deleteGroupLoading
                    ? 'Deleting...'
                    : 'Delete this group'
                  }
                </Button>
              </Col>
            </Row>
        : ''
      }

   <Form onSubmit={props.submit}>
     <Modal.Body>
       <FormGroup controlId="groupName">
         <ControlLabel>Name</ControlLabel>
         <FormControl type="text" required
           defaultValue={props.group && props.group.name}
           onChange={props.handleNameChange}/>
       </FormGroup>
     </Modal.Body>

     <Modal.Footer>
       <Row>
         <Col md={6} sm={12} xs={12}>
          <FormGroup validationState='error'>
             <HelpBlock>
               {
                  props.saveGroupError != null
                    ? props.saveGroupError
                    : ''
                }
              </HelpBlock>
            </FormGroup>
          </Col>
          <Col md={6} sm={12} xs={12}>
           <Button onClick={props.close}>Close</Button>
           <Button disabled={props.saveGroupLoading} type="submit" bsStyle="success">
               {
                 props.saveGroupLoading
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

export default GroupEditFormView
