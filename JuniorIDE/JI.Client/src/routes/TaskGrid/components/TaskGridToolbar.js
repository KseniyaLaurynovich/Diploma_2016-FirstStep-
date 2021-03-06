import React from 'react'
import { FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'

import Toolbar from '../../../containers/ToolbarContainer'

const TaskGridToolbarView = (props) => (
  <Toolbar>

     <div className='inline padding-sm'>
        <div className='inline'>
          <FormControl type="text" placeholder="Type for filtering..." />
        </div>

       <Button className='padding-sm ml-5' onClick={props.openNewTaskModal}>
         <Glyphicon
           className  = 'glypicon--pointer'
           glyph      = 'plus'>
         </Glyphicon>
       </Button>
     </div>
  </Toolbar>
)

export default TaskGridToolbarView
