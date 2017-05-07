import React from 'react'
import { Link } from 'react-router'

import { FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'
import Toolbar from '../../../containers/ToolbarContainer'

const renderViewMode = (props) => (
  <Toolbar>
     <div className='inline padding-sm ml-5'>
      <Button className='padding-sm' onClick={props.toggleVisibility}>
        <Glyphicon
          className  = 'glypicon--pointer'
          glyph      = { props.task.isVisible ? 'eye-close' : 'eye-open'}>
        </Glyphicon>
        { props.isVisible ? ' Make unvisible' : ' Make visible'}
      </Button>
     </div>
     <div className='inline padding-sm pull-right'>
       <Button className='padding-sm ml-5' onClick={props.openEditMode}>
         <Glyphicon
           className  = 'glypicon--pointer'
           glyph      = 'pencil'>
         </Glyphicon>
       </Button>
       <Button className='padding-sm ml-5'>
         <Glyphicon
           className  = 'glypicon--pointer'
           glyph      = 'user'>
         </Glyphicon>
       </Button>
       {
         props.task.autoTested
         ? <Button className='padding-sm ml-5'>
             <Link to={ '/task/' +  props.task.id + '/tests'}>
               <Glyphicon
                 className  = 'glypicon--pointer'
                 glyph      = 'align-justify'>
               </Glyphicon>
             </Link>
           </Button>
         : ''
       }
       {
         !props.task.isShared
         ? <Button className='padding-sm ml-5' onClick={props.openDeadlinesDialog}>
             <Glyphicon
               className  = 'glypicon--pointer'
               glyph      = 'calendar'>
             </Glyphicon>
           </Button>
         : ''
       }
     </div>
  </Toolbar>
)

const renderEditMode = (props) => (
  <Toolbar>
     <div className='inline padding-sm pull-right'>
       <Button
         className = 'padding-sm ml-5'
         bsStyle   = 'success'
         onClick   = {props.saveTask}>
         Save changes
       </Button>

       <Button
         className = 'padding-sm ml-5'
         onClick   = {props.closeEditMode}>
         Cancel
       </Button>
     </div>
  </Toolbar>
)

const TaskViewToolbar = (props) => (
  <div>
  {
    props.isEditMode
    ? renderEditMode(props)
    : renderViewMode(props)
  }
  </div>
)

export default TaskViewToolbar
