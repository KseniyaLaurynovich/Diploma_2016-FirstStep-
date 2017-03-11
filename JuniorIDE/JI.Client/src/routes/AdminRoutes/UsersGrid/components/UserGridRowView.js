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
         <b>Login:</b> {props.item.userName}
       </p>
     </Col>

     <Col md={12} xs={12} sm={12}>
       <p>
         <b>Email:</b> {props.item.email}
       </p>
     </Col>

     <Col md={12} xs={12} sm={12}>
       {
         props.item.roles && props.item.roles.length > 0
         ? <p><b>Roles:</b> {props.item.roles.join(', ')}</p>
         : ''
       }
     </Col>

     <Col md={12} xs={12} sm={12}>
      {
        props.item.groups && props.item.groups.length > 0
        ? <p><b>Groups:</b> {props.item.groups.map((group) => { return group.name; }).join(', ')}</p>
        : ''
      }
     </Col>
   </Row>
</Panel>
)

export default UserGridRowView
