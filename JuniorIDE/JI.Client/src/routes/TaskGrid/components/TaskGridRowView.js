import React from 'react'
import { Link } from 'react-router'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import './TaskGridRowView.scss'

function getTaskLink(task){
  return '/task/' + task.id
}

const TaskGridRowView = (props) => (
  <Panel className='panel--item inline'>
    <Row>
       <Col md={3} xs={12} sm={10}>
         <p className='title'>
           <Link to={getTaskLink(props.item)}>{props.item.name}</Link>
         </p>
       </Col>
       <Col md={7} xs={12} sm={10} className='description'>
           <div dangerouslySetInnerHTML={{
                __html: props.item != null
                        ? props.item.description
                        : ''
              }}>
            </div>
       </Col>
       <Col md={2} xs={12} sm={10}>
          <Glyphicon className='glypicon--button pull-right ml-5' glyph="pencil" onClick={function(){
            browserHistory.push("/task/" + props.item.id)
          }}/>
          <Glyphicon className='glypicon--button pull-right ml-5' glyph="stats" onClick={function(){
            browserHistory.push("/statistic/" + props.item.id)
          }}/>
       </Col>
     </Row>
  </Panel>
)

export default TaskGridRowView
