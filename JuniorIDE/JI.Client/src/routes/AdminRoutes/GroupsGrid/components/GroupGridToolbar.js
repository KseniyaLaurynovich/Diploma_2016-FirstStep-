import React from 'react'
import { FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'

import Toolbar from '../../../../containers/ToolbarContainer'

const GroupGridToolbar = (props) => (
  <Toolbar>
     <div className='inline'>
       <FormControl type="text" placeholder="Type for filtering..."
         onChange={(e) => props.handleTextFilterChange(e.target.value)} />
     </div>

     <div className='inline padding-sm'>
       <Button className='padding-sm'>
         <Glyphicon
           className  = 'glypicon--pointer'
           glyph      = 'plus'
           onClick    = {() => props.openEditModal(null)}>
         </Glyphicon>
       </Button>
     </div>
  </Toolbar>
)

export default GroupGridToolbar
