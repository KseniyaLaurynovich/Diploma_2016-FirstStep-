import React from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'

export const Account = () => (
  <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
     <MenuItem eventKey={4.1}>Action</MenuItem>
     <MenuItem eventKey={4.2}>Another action</MenuItem>
     <MenuItem eventKey={4.3}>Something else here</MenuItem>
     <MenuItem divider />
     <MenuItem eventKey={4.3}>Separated link</MenuItem>
   </NavDropdown>
)

export default Account
