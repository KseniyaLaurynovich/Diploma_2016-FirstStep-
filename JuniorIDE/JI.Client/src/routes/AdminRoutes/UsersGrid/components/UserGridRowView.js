import React from 'react'
import { Panel, Row, Col, Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap'
import helpers from '../../../../utils/helpers'
import './UserGridRow.scss'

var UserGridRowView = React.createClass({
  render: function(){
    return (
      <Panel className='panel--user panel-inline flex-1'
        footer={helpers.dateTimeToString(new Date(this.props.data.registrationDate))}>
        <Row>
           <Col md={10} xs={10}>
             <p className='title'>{this.props.data.firstName} {this.props.data.lastName} {this.props.data.patronymic}</p>
           </Col>

           <Col md={2} xs={2}>
               <Glyphicon className='glypicon--button' glyph="pencil"
                 onClick={() => this.props.globalData.openEditModal(this.props.data.id)}/>
           </Col>

           <Col md={12} xs={12}>
             <p>
               Id: {this.props.data.id}
             </p>
           </Col>

           <Col md={12} xs={12}>
             <p>
               Email: {this.props.data.email}
             </p>
           </Col>

           <Col md={12} xs={12}>
             <p>Roles: {this.props.data.roles.join(', ')}</p>
           </Col>

           <Col md={12} xs={12}>
             <p>Groups:</p>
           </Col>
         </Row>
      </Panel>
    )
  }
})

export default UserGridRowView
