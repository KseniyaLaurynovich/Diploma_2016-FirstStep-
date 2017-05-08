import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import _ from 'lodash'

import './StatisticView.scss'

function getFullName(user){
    return user.firstName + ' ' + user.lastName + ' ' + user.patronymic
}

export const Statistic = (props) => (
    <div>
        <div className='groups-header'>
            {
                props.groups && _.chunk(props.groups, 4).map((group) => (
                    <Row>
                    {
                        group.map((i) => (
                            <Col md={3} key={ i.id }>
                                <div className={ props.currentGroup && props.currentGroup.id == i.id ? 'group-filter active' : 'group-filter' }
                                    onClick={() => { props.changeGroupFilter(i.id) }}>
                                { i.name }
                                </div>
                            </Col>
                        ))
                    }
                    </Row>
                ))
            }
        </div>
        <hr/>
        <div className='users-panel'>
            {
                props.currentGroup == null || props.currentGroup.users.length == 0 
                    ? <p>No users assigned to this group</p>
                    : ''
            }
            {
                props.currentGroup && props.currentGroup.users.length > 0 
                    && _.chunk(props.currentGroup.users, 3).map((group) => (
                    <Row>
                        {
                           group.map((i) => (
                                <Col md={3} key={ i.id }>
                                    <div className='user-card'>
                                        <h3> { getFullName(i) } </h3>
                                        <div className='footer'>
                                            <Button>View</Button>
                                        </div>
                                    </div>
                                </Col>
                            )) 
                        }
                    </Row>
                ))
            }
        </div>
    </div>
)

export default Statistic
