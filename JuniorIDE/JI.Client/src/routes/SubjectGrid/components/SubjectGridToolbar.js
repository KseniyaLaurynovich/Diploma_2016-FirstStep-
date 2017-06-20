import React from 'react'
import { FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'

import Toolbar from '../../../containers/ToolbarContainer'

const SubjectGridToolbar = (props) => (
  <Toolbar>
     <div className='inline padding-sm ml-5'>
        <div className='inline'>
          <FormControl type="text" placeholder="Type for filtering..." />
        </div>

       <Button className='padding-sm ml-5'>
         <Glyphicon
           className  = 'glypicon--pointer'
           glyph      = 'plus'
           onClick    = {() => props.openEditModal(null)}>
         </Glyphicon>
       </Button>
     </div>
  </Toolbar>
)

export default SubjectGridToolbar
