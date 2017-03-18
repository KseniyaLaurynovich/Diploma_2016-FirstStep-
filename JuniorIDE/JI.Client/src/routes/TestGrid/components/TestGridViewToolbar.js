import React from 'react'
import { Link } from 'react-router'

import { FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'
import Toolbar from '../../../containers/ToolbarContainer'

const TestGridToolbarView = (props) => (
  <Toolbar>
    <div className='inline'>
      <Button className='padding-sm' onClick={props.addNewTest}>
        <Glyphicon
          className  = 'glypicon--pointer'
          glyph      = 'plus'>
        </Glyphicon>
      </Button>
    </div>
     <div className='inline pull-right'>
       <Button
         className = 'padding-sm ml-5'
         bsStyle   = 'success'
         onClick   = {props.saveTask}>
         Save changes
       </Button>
     </div>
  </Toolbar>
)

export default TestGridToolbarView
