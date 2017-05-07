import React from 'react'
import _ from 'lodash'
import './TestGrid.scss'
import { Alert, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import TestFileEditor from './TestFileEditorView'

const testFileEditor = (onUpdate, props) => (<TestFileEditor onUpdate={ onUpdate } {...props}/>);

function fileFormatter(cell, row) {
  if(cell && cell.error){
    return(
       <Alert bsStyle="danger">
          <p>{ cell.error }</p>
       </Alert>
    )
  }
  
  if(cell){
    var url = "https://JuniorIDE-site.com/tasks/testFile/?testFileId=" + cell.id;
    return (
      <a target="_blank" href={url}>{ cell ? cell.name : '' }</a>
    )
  }

  return (<p></p>)
}

function toIndexedArray(tests){
  return tests.map(function(test, index){
    test.index = index
    return test
  })
}

const TestGridView = (props) => (
  <div className="testsEditor">
    <FormGroup controlId="outputFileName" validationState={props.outputFileNameError ? "error" : ""}>
      <ControlLabel>Output file name</ControlLabel>
      <FormControl type="text" required
        onChange={props.handleOutputFileNameChange}
        defaultValue={props.outputFileName}/>
      <HelpBlock>{ props.outputFileNameError }</HelpBlock>
    </FormGroup>

    <hr/>

    <FormGroup controlId="tests" validationState={props.testsError ? "error" : ""}>
      <ControlLabel>Tests</ControlLabel>
      <HelpBlock>{ props.testsError }</HelpBlock>
      <BootstrapTable
        data={toIndexedArray(props.tests)} striped={true} hover={true}
        options={ { noDataText: 'No tests', afterDeleteRow: props.handleDeleteRows } }
        deleteRow={ true }
        selectRow={ { mode: 'checkbox' } }
        cellEdit={ { mode: 'dbclick', afterSaveCell: props.handleEditingPreSave } }>
      <TableHeaderColumn hidden dataField="index" isKey>#</TableHeaderColumn>
      <TableHeaderColumn dataField="inputFile"
        dataFormat={ fileFormatter }
        customEditor={ { getElement: testFileEditor } }>Input file</TableHeaderColumn>
      <TableHeaderColumn dataField="outputFile"
        dataFormat={ fileFormatter }
        customEditor={ { getElement: testFileEditor } }>Output file</TableHeaderColumn>
    </BootstrapTable>
   </FormGroup>
 </div>
)

export default TestGridView
