import React from 'react'
import { Panel, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

var UserGridRowView = React.createClass({
  render: function(){
    return (
      <Panel className='panel--user'>
        <h3>{this.props.data.firstName} {this.props.data.lastName} {this.props.data.patronymic}</h3>
          <Row>
           <Col xs={8} md={4}>
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
           <Col xs={1} md={3}>
             <ButtonToolbar>
               <Button onClick={() => this.props.globalData.openEditModal(this.props.data.id)}>Edit</Button>
               <Button>Delete</Button>
             </ButtonToolbar>
           </Col>
         </Row>
      </Panel>
    )
  }
})

export default UserGridRowView
