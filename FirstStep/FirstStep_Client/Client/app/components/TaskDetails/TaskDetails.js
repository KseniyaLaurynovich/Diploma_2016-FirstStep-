import React from 'react'
import styles from './styles.css'
import { Tabs, Tab } from 'react-bootstrap'
import TaskContent from './TaskContent'

export default function(props){
  return(
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Tab 1">
        <TaskContent task={props.task} />
      </Tab>
      <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
      <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
    </Tabs>
  );
}
