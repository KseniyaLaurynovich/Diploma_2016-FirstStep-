import React from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import TreeView from 'treeview-react-bootstrap'
import _ from 'lodash'
import helpers from '../../../utils/helpers'
import StatisticTree from './StatisticTree'

import './StatisticView.scss'

function getFullName(user){
    return user.firstName + ' ' + user.lastName + ' ' + user.patronymic
}

function toTreeViewData(item){
    var treeItem = {
        key: item.id,
        toggled: false,
        date: helpers.dateTimeToString(item.dateTime),
        pass: item.compiled && item.items.every((i) => i.pass),
        compiled: item.compiled,
        subitem: false
     }

     if(item.ext_items != null && item.ext_items.length > 0)
        treeItem.children = item.ext_items.map((subItem, index) => {
            return {
                key: index,
                state: subItem.pass ? 'pass' :'failed',
                inputFileId: subItem.inputFileId,
                inputFileName: subItem.inputFileName,
                outputFileId: subItem.outputFileId,
                outputFileName: subItem.outputFileName,
                subitem: true
            }
        })

    return treeItem
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
        <Row>
            <Col md={ props.currentUser == null ? 12 : 4 } className='users-panel'>
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
                                    <Col md={props.currentUser == null ? 4 : 12} key={ i.id }>
                                        <div className={ props.currentUser != i.id ? 'user-card' : 'user-card active' }>
                                            <h3> { getFullName(i) } </h3>
                                            <div className='footer'>
                                                <ButtonGroup>
                                                    <Button>
                                                        Project
                                                    </Button>
                                                    <Button bsStyle="info" onClick={() => { props.openStatisticForUser(i.id) }}>
                                                        View
                                                    </Button>
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </Col>
                                )) 
                        }
                        </Row>
                    ))
                }
            </Col>
            {
                props.currentStatistic != null && 
                <Col md={8} className='statistic-panel'>
                {
                    props.currentStatistic.length === 0 && 
                       <p>This user does not upload project</p> 
                }
                {
                    props.currentStatistic.length > 0 &&
                        <StatisticTree data={_.sortBy(props.currentStatistic, (i) => { return new Date(i.dateTime) * (-1) }).map(toTreeViewData)}/>
                }
                </Col>
            }
        </Row>
    </div>
)

export default Statistic
