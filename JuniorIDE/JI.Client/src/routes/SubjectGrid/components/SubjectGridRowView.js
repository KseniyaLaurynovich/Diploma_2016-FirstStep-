import React from 'react'
import { Link } from 'react-router'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'

import './SubjectsGridView.scss'

function getSubjectTasksLink(subject){
  return '/' + subject.id + '/tasks'
}

export const SubjectsGridView = (props) => (
  <Panel className='panel--item inline'>
    <Row>
       <Col md={10} xs={12} sm={10}>
         <p className='title'>
           <Link to={getSubjectTasksLink(props.item)}>{props.item.name}</Link>
         </p>
         <div className='subject-info'>
           {
             props.item.groups &&
             <p>Groups: { props.item.groups.length }</p>
           }
           {
             props.item.tasks &&
              <p>Tasks: { props.item.tasks.length }</p>
           }
         </div>
       </Col>

       <Col md={2} xs={12} sm={2}>
           <Glyphicon className='glypicon--button pull-right' glyph="pencil"
             onClick={() => props.openEditModal(props.item.id)}/>
       </Col>
     </Row>
  </Panel>
)

export default SubjectsGridView
