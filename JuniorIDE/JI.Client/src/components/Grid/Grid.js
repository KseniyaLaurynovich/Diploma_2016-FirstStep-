import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Grid = (props) => (
  <Row>
    {
      props.items && props.items.length > 0
        ? props.filter(props.items).map((item, index) => {
          return(
          <Col md={props.md} sm={props.sm} xs={props.xs} key={index}>

            <props.itemComponent
              item = {item}
              index = {index}
              openEditModal = {props.openEditModal}/>

          </Col>)
        })
        : <p>No items</p>
    }
  </Row>
)

export default Grid
