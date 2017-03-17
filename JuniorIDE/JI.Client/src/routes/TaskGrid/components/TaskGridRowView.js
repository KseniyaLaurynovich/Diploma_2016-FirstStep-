import React from 'react'
import { Link } from 'react-router'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'

function getTaskLink(task){
  return '/task/' + task.id
}

const TaskGridRowView = (props) => (
  <Panel className='panel--item inline'>
    <Row>
       <Col md={12} xs={12} sm={10}>
         <p className='title'>
           <Link to={getTaskLink(props.item)}>{props.item.name}</Link>
         </p>
       </Col>
     </Row>
     <Row>
       <Col md={12} xs={12} sm={2}>
           <Glyphicon className='glypicon--button' glyph="pencil"
             onClick={() => props.openEditModal(props.item.id)}/>
       </Col>
     </Row>
  </Panel>
)

export default TaskGridRowView
