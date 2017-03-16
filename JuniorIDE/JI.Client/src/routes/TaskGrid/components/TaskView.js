import React from 'react'
import { FormGroup, FormControl, Form, Button, Row, Col, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap'
import TinyMCE from 'react-tinymce'

const renderEditMode = (props) => (
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
  </Form>
)

const renderViewMode = (props) => (
  <div>
    <h2>
      {
        props.item.name
      }
    </h2>
    <textarea value={props.item.description}/>
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
