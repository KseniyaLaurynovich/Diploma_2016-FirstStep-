import React from 'react'
import { Row, Col } from 'react-bootstrap'
import _ from 'lodash'

function drawRow(props, items, index){
  return (
  <Row key={index}>
    {
      items.map((item, index) => {
          return(
          <Col md={props.md} sm={props.sm} xs={props.xs} key={index}>

            <props.itemComponent
              item = {item}
              index = {index}
              openEditModal = {props.openEditModal}/>

          </Col>)
        })
    }
  </Row>
)}

function drawGrid(props){
  var chunkSize = 3
  var items = _.chunk(props.filter(props.items), chunkSize);
  return items.map((row, index) => drawRow(props, row, index))
}

const Grid = (props) => (
  <div>
    {
      props.items && props.items.length > 0
        ? drawGrid(props)
        : <p>No items</p>
    }
  </div>
)

export default Grid
