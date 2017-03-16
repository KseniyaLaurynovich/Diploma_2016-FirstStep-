import React from 'react'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'

const TaskGridRowView = (props) => (
  <Panel className='panel--item inline'>
    <Row>
       <Col md={12} xs={12} sm={10}>
         <p className='title'>{props.item.name}</p>
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