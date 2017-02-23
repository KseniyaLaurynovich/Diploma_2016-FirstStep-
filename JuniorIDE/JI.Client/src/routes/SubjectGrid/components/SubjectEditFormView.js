import React from 'react'
import { Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock } from 'react-bootstrap'

const SubjectEditFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title className='modal-title'>Create subject</Modal.Title>
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
      <FormGroup validationState='error' className='pull-left'>
         <HelpBlock>
           {
              props.saveSubjectError != null
                ? props.saveUserError
                : ''
            }
          </HelpBlock>
        </FormGroup>
       <Button onClick={props.close}>Close</Button>
       <Button disabled={props.saveSubjectLoading} type="submit" bsStyle="success">
           {
             props.saveSubjectLoading
             ? 'Saving...'
             : 'Save changes'
           }
       </Button>
     </Modal.Footer>
     </Form>
   </Modal>
)

export default SubjectEditFormView
