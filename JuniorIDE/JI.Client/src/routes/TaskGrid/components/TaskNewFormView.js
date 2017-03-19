import React from 'react'
import { Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock, Checkbox } from 'react-bootstrap'

const TaskNewFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header>
       <Modal.Title className='modal-title'>
         New task
       </Modal.Title>
     </Modal.Header>

   <Form onSubmit={props.submit}>
     <Modal.Body>
       <FormGroup controlId="taskName">
         <FormControl type="text" required placeholder='Name'
           onChange={props.handleNameChange}/>
       </FormGroup>
     </Modal.Body>

     <Modal.Footer>
       <Row>
         <Col md={6} sm={12} xs={12}>
          <FormGroup validationState='error'>
             <HelpBlock>
               {
                  props.saveError != null
                    ? props.saveError
                    : ''
                }
              </HelpBlock>
            </FormGroup>
          </Col>
          <Col md={6} sm={12} xs={12}>
           <Button onClick={props.close}>Close</Button>
           <Button disabled={props.saveLoading} type="submit" bsStyle="success">
               {
                 props.saveLoading
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

export default TaskNewFormView
