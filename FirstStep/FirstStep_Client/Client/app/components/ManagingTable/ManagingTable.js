import React from 'react'
import { Table, ButtonGroup, Button } from 'react-bootstrap'

export default function(props){
  return(
  <Table striped bordered condensed hover>
   <thead>
     <tr>
      <th>#</th>
      {
        props.fields.map((item) =>
          <th key={item.Key}>{item.Value}</th>
        )
      }
       <th>Actions</th>
     </tr>
   </thead>
   <tbody>
     {
       props.items.map((item, index) =>
         <tr key={index + 1}>
          <td>{index + 1}</td>
          {
            props.fields.map((field) =>
              <td key={field.Key + item.Id}>{item[field.Key]}</td>
            )
          }
           <td>
             <ButtonGroup>
               {
                 props.actions.map((action) =>
                   <Button key={action.Title} bsSize="small" onClick={() => action.Action(item)} bsStyle="default">{action.Title}</Button>
                 )
               }
            </ButtonGroup>
           </td>
         </tr>
       )
     }
   </tbody>
 </Table>
  );
}
