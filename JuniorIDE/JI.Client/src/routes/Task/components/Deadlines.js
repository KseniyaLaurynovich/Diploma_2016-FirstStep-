import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'
import { Glyphicon, Modal, Button, FormGroup, FormControl, Row, Col, Form, HelpBlock, Checkbox, DropdownButton, MenuItem } from 'react-bootstrap'

const DeadlinesFormView = (props) => (
  <Modal show={props.showModal} onHide={props.close}>
     <Modal.Header closeButton={true}>
       <Modal.Title className='modal-title'>
         {
           "Manage deadlines"
         }
       </Modal.Title>
     </Modal.Header>

     <Modal.Body>
      {
          props.deadlines && props.deadlines.map((deadline) => (
              <Row>
                  <Col md='6'>
                    <h4>
                        { deadline.groupName }
                    </h4>
                  </Col>
                  <Col md='6'>
                    <DatePicker id="example-datepicker" 
                        value={ deadline.deadline }
                        onChange={function(value){ props.setDeadline(deadline.groupId, value) }} />
                  </Col>
              </Row>
          ))
      }
     </Modal.Body>
   </Modal>
)

export default DeadlinesFormView
