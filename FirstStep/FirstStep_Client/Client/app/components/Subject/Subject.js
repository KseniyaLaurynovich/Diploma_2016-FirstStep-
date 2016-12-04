import React from 'react'
import Task from '../Task/Task'
import styles from './styles.css'
import Groups from '../Groups/Groups'
import { Button, Panel, DropdownButton, MenuItem, ButtonGroup} from 'react-bootstrap'

export default function (props){
    var groupsOfTasks = [];
    var i,j,temporary,chunk = 3;
    console.log(props.subject.Tasks)

    if(props.subject.Tasks !== null)
    {
      for (i=0,j=props.subject.Tasks.length; i<j; i+=chunk) {
          temporary = props.subject.Tasks.slice(i,i+chunk);
          groupsOfTasks.push(temporary);
      }
    }
    return(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
      <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">{props.subject.Name}</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-1">
                    <a href="#" onClick={() => props.addTaskClick(props.subject.Id)}><i className="fa fa-2x fa-fw fa-plus"></i></a>
                  </div>
                  <div className="col-md-1">
                    <a href="#" onClick={() => props.deleteClick(props.subject.Id)}><i className="fa fa-2x fa-fw fa-minus"></i></a>
                  </div>
                  <div className="col-md-10 text-right">
                    <Groups
                      groups={props.subject.AssignGroups}
                      onManageClick={() => props.manageGroupsClick(props.subject)}/>
                  </div>
                </div>
                {groupsOfTasks.map((group) =>
                     group.map((task) => <Task key={task.Id} task={task}/>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
