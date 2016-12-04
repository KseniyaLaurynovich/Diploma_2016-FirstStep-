import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default function (props){
  return(
    <div className="btn-group btn-group-lg">
     <a className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Groups <span className="fa fa-caret-down"></span></a>
     <ul className="dropdown-menu" role="menu">
       <li>
         <a href="#" onClick={props.onManageClick}>Manage</a>
       </li>
       {props.groups && props.groups != null && props.groups.map((group) =>
          <li disabled key={group.Id}><a href="#">{group.Name}</a></li>)}
     </ul>
   </div>
  );
};
