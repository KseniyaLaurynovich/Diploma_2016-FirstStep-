import React from 'react'
import { FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap'

import Toolbar from '../../../../containers/ToolbarContainer'

function renderMenuItem(key, label, onClick){
  return (
    <MenuItem key={key} onClick={() => onClick(key)}>
      {
        label
      }
    </MenuItem>
  )
}

function renderMenu(menuItems, onClick){
  var items = []
  for (var key in menuItems) {
     if (menuItems.hasOwnProperty(key)) {
       items.push((
         renderMenuItem(key, menuItems[key].label, onClick)
       ))
     }
   }
   return items
}

const UserGridToolbar = (props) => (
  <Toolbar>
   <div className='inline'>
     <FormControl type="text" placeholder="Type for filtering..." onChange={(e) => props.handleTextFilterChange(e.target.value)} />
   </div>

   <div className='inline padding-sm'>
     <DropdownButton title={props.filterLabel} id="bg-nested-dropdown" className='padding-sm'>
       {
          renderMenu(props.filters, props.filter)
       }
    </DropdownButton>
   </div>

   <div className='inline padding-sm'>
     <DropdownButton title={props.sortLabel} id="bg-nested-dropdown" className='padding-sm'>
       {
         renderMenu(props.sorts, props.sort)
       }
    </DropdownButton>
   </div>

   <div className='inline padding-sm'>
     <Button className='padding-sm' onClick={props.resetAll}>
       Reset filters
     </Button>
   </div>
 </Toolbar>
)

export default UserGridToolbar
