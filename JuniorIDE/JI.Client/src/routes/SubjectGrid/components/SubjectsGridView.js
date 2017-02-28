import React from 'react'
import { Row, Col, Glyphicon, Button } from 'react-bootstrap'
import './SubjectsGridView.scss'

export const SubjectsGridView = (props) => (
  <div className='container'>
    <Row className='subject-grid-item'>
      <Col md={8} sm={8} xs={8}>
        <h3>Add subject</h3>
      </Col>
      <Col md={4} sm={4} xs={4}>
        <Glyphicon glyph='plus glypicon--bg pull-right glypicon--pointer'
          onClick={() => props.openEditModal()}/>
      </Col>
    </Row>
      {
          props.subjects.map((subject, index) => (
          <Row className='subject-grid-item'>
            <Col md={8} sm={8} xs={8}>
              <h3>{subject.name}</h3>
            </Col>
            <Col md={4} sm={4} xs={4}>
              <Glyphicon glyph='edit glypicon--bg pull-right glypicon--pointer'
                onClick={() => props.openEditModal(subject.id)}/>
            </Col>
          </Row>
        ))
      }

    {
      props.children
    }
  </div>
)

export default SubjectsGridView
