import React from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import './SubjectsGridView.scss'

export const SubjectsGridView = (props) => (
  <div className='container'>
    <Row>
      <Col md={4} sm={6} xs={12}>
        <a href=''>
            <div  className='subject-grid-item'>
            <Glyphicon className="glypicon--bg" glyph='plus'/>
            <p className='p--bg'>Add subject</p>
          </div>
        </a>
      </Col>
      {
        props.subjects.map((subject, index) => (

          <Col md={4} sm={6} xs={12} key={index}>
            <a href=''>
              <div  className='subject-grid-item' id={subject.id}>
                <Glyphicon className="glypicon--bg" glyph='briefcase'/>
                <p className='p--bg'>{subject.name}</p>
              </div>
            </a>
          </Col>

        ))
      }
    </Row>
  </div>
)

export default SubjectsGridView
