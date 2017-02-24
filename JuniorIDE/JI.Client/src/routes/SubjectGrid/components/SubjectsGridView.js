import React from 'react'
import { Row, Col, Glyphicon, Button } from 'react-bootstrap'
import './SubjectsGridView.scss'

export const SubjectsGridView = (props) => (
  <div className='container'>
    <Row>
      <Col md={4} sm={6} xs={12}>
          <div className='subject-grid-item glypicon--pointer'>
            <Glyphicon className="glypicon--bg" glyph='plus'
              onClick={() => props.openEditModal()}/>
            <p className='p--bg'>Add subject</p>
          </div>
      </Col>
      {
          props.subjects.map((subject, index) => (

          <Col md={4} sm={6} xs={12} key={index}>
            <div className='subject-grid-item glypicon--pointer' id={subject.id}>
              <Glyphicon className="glypicon--bg" glyph='briefcase'
                onClick={() => props.openEditModal(subject.id)}/>
              <p className='p--bg'>{subject.name}</p>
            </div>
          </Col>

        ))
      }
    </Row>
    {
      props.children
    }
  </div>
)

export default SubjectsGridView
