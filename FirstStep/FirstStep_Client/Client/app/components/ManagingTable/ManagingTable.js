import React from 'react'
import { Table } from 'react-bootstrap'

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
              <td key={item.Key + item[field.Key]}>{item[field.Key]}</td>
            )
          }
           <td>

           </td>
         </tr>
       )
     }
   </tbody>
 </Table>
  );
}
