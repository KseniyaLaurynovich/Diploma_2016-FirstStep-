import React from 'react'
import { ControlLabel, FormGroup, FormControl, Form, Button, Row, Col, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap'
import TinyMCE from 'react-tinymce'
import './Task.scss'

const renderEditMode = (props) => (
  <div className='taskPage'>
      <FormGroup controlId="taskName">
        <ControlLabel>Name</ControlLabel>
        <FormControl type="text" required
          defaultValue={props.editingItem && props.editingItem.name}
          onChange={props.handleNameChange}/>
      </FormGroup>
      <FormGroup controlId="taskDescription">
        <TinyMCE
         content={props.editingItem && props.editingItem.description}
         config={{
           plugins: 'link image',
           toolbar: 'undo redo | bold italic | alignleft aligncenter alignright '
         }}
         onChange={props.handleDescriptionChange}
       />
     </FormGroup>
     <FormGroup>
       <Checkbox
         onChange={props.handleTestedTypeChange}
         defaultChecked={props.editingItem ? props.editingItem.autoTested : false}>
         Auto tested
       </Checkbox>
     </FormGroup>
     <FormGroup>
       <Checkbox
         onChange={props.handleSharedTypeChange}
         defaultChecked={props.editingItem ? props.editingItem.isShared : false}>
         Shared
       </Checkbox>
     </FormGroup>
     <hr/>
     <Row>
       <Col md={6} sm={6} xs={6}>
         <Checkbox onChange={props.handleDeleteConfirmation}>
           I undestand that task can not be restored.
         </Checkbox>
       </Col>
       <Col md={6} sm={6} xs={6}>
         <Button onClick={props.handleDelete}
           disabled={!props.deleteConfirmed
                    || props.deleteLoading} bsStyle='danger' className='pull-right'>
           {
             props.deleteSubjectLoading
             ? 'Deleting...'
             : 'Delete this task'
           }
         </Button>
       </Col>
     </Row>
  </div>
)

const renderViewMode = (props) => (
  <div className='taskPage'>
    <div dangerouslySetInnerHTML={{
        __html: props.item != null
                ? props.item.description
                : ''
      }}>
    </div>
    {
      props.item != null && !props.item.description &&
      <div className='no content'>
        No description for this task
      </div>
    }
  </div>
)

const TaskView = (props) => (
  <div>
    {
      props.isEditMode
        ? renderEditMode(props)
        : renderViewMode(props)
    }
  </div>
)

export default TaskView
