import React from 'react'
import styles from './styles.css'
import { Tabs, Tab } from 'react-bootstrap'
import TaskContent from './TaskContent'

export default function(props){
  return(
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Content">
        <TaskContent task={props.task} />
      </Tab>
      <Tab eventKey={2} title="Tests">Tab 2 content</Tab>
      <Tab eventKey={3} title="Assing groups">Tab 3 content</Tab>
      <Tab eventKey={3} title="History">Tab 4 content</Tab>
    </Tabs>
  );
}
