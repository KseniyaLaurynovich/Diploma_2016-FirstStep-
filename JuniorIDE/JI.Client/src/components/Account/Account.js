import React from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { logoutUser } from '../store/user'

export const Account = (props) => (
  <NavDropdown eventKey={4} title={props.name}  id="basic-nav-dropdown">
     <MenuItem eventKey={4.1}>Change password</MenuItem>
     <MenuItem divider />
     <MenuItem eventKey={4.3} onClick={props.logoutUser}>Logout</MenuItem>
   </NavDropdown>
)

export default Account
