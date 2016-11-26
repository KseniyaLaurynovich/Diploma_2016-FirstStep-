import React from 'react'

export default function(props){
  return(
    <div>
      <h2>{props.task && props.task.Name}</h2>
      <p>{props.task && props.task.Description}</p>
    </div>
  );
}
