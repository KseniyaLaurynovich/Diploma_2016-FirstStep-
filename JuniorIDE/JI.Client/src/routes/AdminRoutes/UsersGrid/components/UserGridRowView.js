import React from 'react'
import { Panel, Row, Col, Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap'

var UserGridRowView = React.createClass({
  render: function(){
    return (
      <Panel className='panel--user'>
        <h3>{this.props.data.firstName} {this.props.data.lastName} {this.props.data.patronymic}</h3>
          <Row>
           <Col xs={12} md={4}>
             <p>
               Id: {this.props.data.id}
             </p>
             <p>
               Email: {this.props.data.email}
             </p>
           </Col>
           <Col xs={9} md={5}>
             <p>Roles: {this.props.data.roles.join(', ')}</p>
             <p>Groups:</p>
           </Col>
           <Col xs={3} md={3} className='pull-right'>
             <Glyphicon className='like-button' glyph="pencil"
               onClick={() => this.props.globalData.openEditModal(this.props.data.id)}/>
           </Col>
         </Row>
      </Panel>
    )
  }
})

export default UserGridRowView
