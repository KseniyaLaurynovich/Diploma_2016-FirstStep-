import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS'
export const TASK_TESTS_CHANGE  = 'TASK_TESTS_CHANGE'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchTaskSuccess = (task) => {
  return {
    type    : FETCH_TASK_SUCCESS,
    payload : task
  }
}

export const taskTestsChange = (tests) => {
  return {
    type    : TASK_TESTS_CHANGE,
    payload : tests
  }
}

export const actions = {
  fetchTaskSuccess
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TASK_SUCCESS]      : (state, action) => {
    return Object.assign({}, state, { currentTask: action.payload })
  },
  [TASK_TESTS_CHANGE]       : (state, action) => {
    return Object.assign({}, state, { currentTask:
      Object.assign({}, state.currentTask, { tests: action.payload })})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentTask           : null
}

export default function testGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function fetchTask(taskId){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchTask(token, taskId).then(function(response){
      dispatch(fetchTaskSuccess(response.data))
    })
  }
}

export function addNewTest(){
  return (dispatch, getState) => {
    var tests = getState().testGrid.currentTask.tests || []
    var clonedTests = _.cloneDeep(tests)
    clonedTests.push({})

    dispatch(taskTestsChange(clonedTests))
  }
}

export function saveTask(){
  return(dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.saveTask(token, getState().testGrid.currentTask)
    .then(function(response){

    })
  }
}

export function preSaveTaskTest(row, cellName, cellValue){
  return (dispatch, getState) => {
    var taskId = getState().testGrid.currentTask.id
    var token = getState().user.credentials.access_token

    requests.saveTaskTest(token, taskId, cellValue.file).then(function(response){
      var tests = getState().testGrid.currentTask.tests || []
      var clonedTests = _.cloneDeep(tests)
      var test = _.find(clonedTests, function(test){
        return (test.inputFile && test.inputFile.tempId == cellValue.tempId)
        || (test.outputFile.tempId && test.outputFile.tempId == cellValue.tempId)
      })

      if(test){
        clonedTests.splice(clonedTests.indexOf(test), 1)
        if(test.inputFile && test.inputFile.tempId == cellValue.tempId){
          test.inputFile.id = response.data
          test.inputFile.name = 'input file ' + row.index
        }
        else {
          test.outputFile.id = response.data
          test.outputFile.name = 'output file ' + row.index
        }
        clonedTests.push(test)
        dispatch(taskTestsChange(clonedTests))
      }
    })
  }
}
