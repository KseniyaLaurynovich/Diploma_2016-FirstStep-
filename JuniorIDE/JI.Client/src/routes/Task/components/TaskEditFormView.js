import React from 'react'
import { FormGroup, FormControl, Form, Button, Row, Col, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap'
import TinyMCE from 'react-tinymce'
import _ from 'lodash'

import './TaskEditForm.scss'

function renderTestsBlock(props){
  return(
    <div className='mt-10'>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h3>Tests</h3>
        </Col>
      </Row>
      <Row>
        <Col md={5} sm={12} xs={12}>
          <input type='file' onChange={props.inputFileChange}/>
          {
            props.newInputFileTest
            ?   <textarea
                  className='document-preview-box mt-10' readOnly
                  defaultValue={props.newInputFileTest} />
            : ''
          }
        </Col>
        <Col md={5} sm={12} xs={12}>
          <input type='file' onChange={props.outputFileChange}/>
          {
            props.newOutputFileTest
            ?   <textarea
                  className='document-preview-box mt-10' readOnly
                  defaultValue={props.newOutputFileTest} />
             : ''
          }
        </Col>
        <Col md={2} sm={12} xs={12}>
          <Glyphicon className='glypicon--button glypicon-sm pull-right' glyph='plus'onClick={props.saveNewTest}/>
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <FormGroup validationState='error' className='text-center'>
            <HelpBlock>{props.newTestError}</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      {
        props.task != null && props.task.tests
        ? props.task.tests.map((test, index) => {
          return (
            <Row className='mt-10' key={index}>
              <Col md={1} sm={12} xs={12}>
                <b>{index + 1}</b>
              </Col>
              <Col md={5} sm={12} xs={12}>
                <textarea
                  className='document-preview-box' readOnly
                  defaultValue={test.inputFile} />
              </Col>
              <Col md={5} sm={12} xs={12}>
                <textarea
                  className='document-preview-box' readOnly
                  defaultValue={test.inputFile} />
              </Col>
              <Col md={1} sm={12} xs={12}>
                <Glyphicon className='glypicon--button glypicon-sm pull-right' glyph='remove'/>
              </Col>
            </Row>
          )
        })
        : ''
      }
    </div>
  )
}

const TaskEditFormView = (props) => (
  <Form onSubmit={props.saveTask}>
    <h2>
      {
        props.task && props.task.id
        ? 'Edit task'
        : 'New task'
      }
    </h2>
    <FormGroup controlId="taskName">
      <FormControl type="text" required placeholder='Name'
        defaultValue={props.task && props.task.name}
        onChange={props.handleNameChange}/>
    </FormGroup>
    <FormGroup controlId="taskDescription">
      <TinyMCE
       content={props.task && props.task.description}
       config={{
         plugins: 'link image code',
         toolbar: 'undo redo | bold italic | alignleft aligncenter alignright '
       }}
       onChange={props.handleDescriptionChange}
     />
   </FormGroup>
   <FormGroup>
     <Checkbox
       onChange={props.handleTestedTypeChange}
       defaultChecked={props.task ? props.task.autoTested : false}>
       Auto tested
     </Checkbox>
     {
       props.task && props.task.autoTested
       ? renderTestsBlock(props)
       : ''
     }
   </FormGroup>
   <FormGroup>
       <Row>
         <Col md={12} sm={12} xs={12}>
           <Button onClick={props.close} className='pull-right' bsStyle="success">Cancel</Button>
           <Button disabled={props.saveLoading} type='submit' className='pull-right mr-10' bsStyle="success">
               {
                 props.saveGroupLoading
                 ? 'Saving...'
                 : 'Save'
               }
           </Button>
         </Col>
      </Row>
    </FormGroup>
  </Form>
)

export default TaskEditFormView
