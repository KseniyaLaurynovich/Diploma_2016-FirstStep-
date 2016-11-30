import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default function (props){
  return(
    <DropdownButton title="Groups" id="bg-nested-dropdown">
      <MenuItem>Manage</MenuItem>
      <MenuItem divider />
      {props.groups.map((group) =>
         <MenuItem disabled>{group.Name}</MenuItem>)}
    </DropdownButton>
  );
};
