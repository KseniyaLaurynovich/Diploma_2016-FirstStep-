import React from 'react'
import { Row, Col, Button, ButtonGroup, FormGroup, FormControl, Glyphicon, Image } from 'react-bootstrap'
import TreeView from 'treeview-react-bootstrap'
import {Treebeard} from 'react-treebeard';
import _ from 'lodash'
import helpers from '../../../utils/helpers'
import StatisticTree from './StatisticTree'
import ProjectTree from './ProjectTree'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'

import './StatisticView.scss'
import Women from '../../../assets/women.jpg'
import Default from '../../../assets/default-avatar.png'

 function onToggle(node, toggled){
        
        if(node.children){ 
            node.toggled = toggled;
            node.active = true;
        }
    }

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
                pass: subItem.pass,
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
            <Col md={12} className='users-panel'>
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
                            group.map((i, index) => (
                                    <Col md={4} key={ i.id }>
                                        <div className={ props.currentUser != i.id ? 'user-card' : 'user-card active' }>
                                            <Row>
                                                <Col md={3}>
                                                    <Image className='avatar' src={ index === 2 ? Women : Default} circle/>
                                                </Col>
                                                <Col md={9}>
                                                    <h3 className='mt-5'> { getFullName(i) } </h3>
                                                </Col>
                                            </Row>
                                            <div className='mark-container'>
                                                {
                                                    props.markIsEditMode
                                                    ? props.markEditModeUser === i.id
                                                        ? <FormGroup controlId="mark">
                                                            <label className='label-left'>Mark</label>
                                                            <FormControl type="number" onChange={props.handleMarkChange}
                                                                defaultValue={i.mark}/>
                                                            <ButtonGroup>
                                                                <Button onClick={(e) => {props.saveMark(i.id)}}><Glyphicon glyph="ok"/></Button>
                                                                <Button onClick={() => {props.setMarkEditMode(null, false, null)}}><Glyphicon glyph="remove"/></Button>
                                                            </ButtonGroup>
                                                          </FormGroup>
                                                        : i.mark 
                                                            ? <h4>Mark: {i.mark}</h4>
                                                            : <h4>No mark</h4>
                                                    : i.mark 
                                                            ? <h4>Mark: {i.mark}</h4>
                                                            : <h4>No mark</h4>
                                                }
                                            </div>
                                            <div className='footer'>
                                                <ButtonGroup>
                                                    <Button onClick={() => {props.setMarkEditMode(i.id, true, i.mark)}}>
                                                        Set mark
                                                    </Button>
                                                    <Button onClick={() => { props.openStatisticForUser(i.id) }}>
                                                        Tryings
                                                    </Button>
                                                    <Button onClick={() => { props.changeProject(i.id) }}>
                                                        Project
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
                props.mode === 'TRYINGS_MODE' && props.currentStatistic != null && 
                <Row className='ml-15'>
                    <Col md={3} className='statistic-panel'>
                    <h3>Tryings</h3>
                    {
                        props.currentStatistic.length === 0 && 
                        <p>This user does not upload project</p> 
                    }
                    {
                        props.currentStatistic.length > 0 &&
                            <StatisticTree data={_.sortBy(props.currentStatistic, (i) => { return new Date(i.dateTime) * (-1) }).map(toTreeViewData)}/>
                    }
                    </Col>  
                    
                </Row>
            }
            {
                props.mode === 'PROJECT_MODE' &&
                <Row className='ml-15'>
                    <Col md={3} className='project-tree-panel'>
                        <h3>Project</h3>
                        {
                            !props.currentProject && 
                                <p>This user does not upload project</p> 
                        }
                        {
                            props.currentProject &&
                                <ProjectTree data={props.currentProject} loadFile={props.loadFile}/>
                        }
                        
                    </Col> 

                    <Col md={9} className='mt-20'>
                    {
                        props.currentProject && props.currentFile &&
                            <SyntaxHighlighter language='cpp' style={docco}>{props.currentFile}</SyntaxHighlighter>
                    }
                    </Col>

                </Row>   
            }
        </Row>
    </div>
)

export default Statistic
