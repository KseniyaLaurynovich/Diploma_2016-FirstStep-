import React from 'react'
import { Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock, Checkbox } from 'react-bootstrap'

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
     </Modal.Body>

     <Modal.Footer>
       <Row>
         <Col md={6} sm={12} xs={12}>
          <FormGroup validationState='error' className='pull-left'>
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
