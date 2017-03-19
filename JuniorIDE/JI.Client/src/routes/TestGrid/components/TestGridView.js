import React from 'react'
import _ from 'lodash'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import TestFileEditor from './TestFileEditorView'

const testFileEditor = (onUpdate, props) => (<TestFileEditor onUpdate={ onUpdate } {...props}/>);

function fileFormatter(cell, row) {
  return (
    <p>{ cell ? cell.name : '' }</p>
  );
}

function toIndexedArray(tests){
  return tests.map(function(test, index){
    test.index = index
    if(test.inputFile){
      test.inputFile.name = 'input file ' + (test.index + 1)
    }
    if(test.outputFile){
      test.outputFile.name = 'output file ' + (test.index + 1)
    }
    return test
  })
}

const TestGridView = (props) => (
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
)

export default TestGridView
