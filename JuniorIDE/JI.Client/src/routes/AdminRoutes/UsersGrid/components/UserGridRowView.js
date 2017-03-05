import React from 'react'
import { Panel, Row, Col, Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap'
import helpers from '../../../../utils/helpers'
import './UserGridRow.scss'

const UserGridRowView = (props) => (
<Panel className='panel--user inline'
  footer={helpers.dateTimeToString(new Date(props.item.registrationDate))}>
  <Row>
     <Col md={10} xs={12} sm={10}>
       <p className='title'>{props.item.firstName} {props.item.lastName} {props.item.patronymic}</p>
     </Col>

     <Col md={2} xs={12} sm={2}>
         <Glyphicon className='glypicon--button pull-right' glyph="pencil"
           onClick={() => props.openEditModal(props.item.id)}/>
     </Col>

     <Col md={12} xs={12} sm={12}>
       <p>
         Id: {props.item.id}
       </p>
     </Col>

     <Col md={12} xs={12} sm={12}>
       <p>
         Email: {props.item.email}
       </p>
     </Col>

     <Col md={12} xs={12} sm={12}>
       <p>Roles: {props.item.roles.join(', ')}</p>
     </Col>

     <Col md={12} xs={12} sm={12}>
       <p>Groups:</p>
     </Col>
   </Row>
</Panel>
)

export default UserGridRowView
