import React from 'react'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'

import './GroupGridRow.scss'

const GroupsGridView = (props) => (
  <Panel className='panel--item inline'>
    <Row>
       <Col md={10} xs={12} sm={10}>
         <p className='title'>{props.item.name}</p>
       </Col>

       <Col md={2} xs={12} sm={2}>
           <Glyphicon className='glypicon--button pull-right' glyph="pencil"
             onClick={() => props.openEditModal(props.item.id)}/>
       </Col>
     </Row>
  </Panel>
)

export default GroupsGridView
