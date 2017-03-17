import React from 'react'
import { FormGroup, FormControl, Form, Button, Row, Col, Checkbox, Glyphicon, HelpBlock } from 'react-bootstrap'
import TinyMCE from 'react-tinymce'
import './Task.scss'

const renderEditMode = (props) => (
  <div className='taskPage'>
      <h2>
        {
          props.editingItem && props.editingItem.id
          ? 'Edit task'
          : 'New task'
        }
      </h2>
      <FormGroup controlId="taskName">
        <FormControl type="text" required placeholder='Name'
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
  </div>
)

const renderViewMode = (props) => (
  <div className='taskPage'>
    <h2>
      {
        props.item && props.item != null
        ? props.item.name
        : ''
      }
    </h2>
    <div dangerouslySetInnerHTML={{
        __html: props.item != null
                ? props.item.description
                : ''
      }}>
    </div>
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
