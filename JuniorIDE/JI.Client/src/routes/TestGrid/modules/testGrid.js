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
export const TASK_OUTPUT_FILE_NAME_CHANGE = 'TASK_OUTPUT_FILE_NAME_CHANGE'
export const OUTPUT_FILE_NAME_ERROR = 'OUTPUT_FILE_NAME_ERROR'
export const TESTS_ERROR = 'TESTS_ERROR'
export const RESET_TESTS_ERRORS = 'RESET_TESTS_ERRORS'
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

export const outputFileNameChange = (event) => {
  return {
    type: TASK_OUTPUT_FILE_NAME_CHANGE,
    payload: event.target.value
  }
}

export const outputFileNameError = (error) => {
  return {
    type: OUTPUT_FILE_NAME_ERROR,
    payload: error
  }
}

export const testsError = (error) => {
  return {
    type: TESTS_ERROR,
    payload: error
  }
}

export const resetErrors = () => {
  return {
    type: RESET_TESTS_ERRORS
  }
}

export const actions = {
  fetchTaskSuccess,
  outputFileNameChange,
  resetErrors,
  testsError,
  outputFileNameError
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TASK_SUCCESS]           : (state, action) => {
    return Object.assign({}, state, { currentTask: action.payload })
  },
  [TASK_TESTS_CHANGE]            : (state, action) => {
    return Object.assign({}, state, { currentTask:
      Object.assign({}, state.currentTask, { tests: action.payload })})
  },
  [TASK_OUTPUT_FILE_NAME_CHANGE] : (state, action) => {
    return Object.assign({}, state, { currentTask:
      Object.assign({}, state.currentTask, { outputFileName: action.payload })})
  },
  [OUTPUT_FILE_NAME_ERROR]       : (state, action) => {
    return Object.assign({}, state, { outputFileNameError: action.payload })
  },
  [TESTS_ERROR]                 : (state, action) => {
    return Object.assign({}, state, { testsError: action.payload })
  },
  [RESET_TESTS_ERRORS]          : (state, action) => {
    return Object.assign({}, state, { testsError: null, outputFileNameError: null })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentTask           : { tests: [], outputFileName: null },
  testsError            : null,
  outputFileNameError   : null
}

export default function testGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function onDeleteTests(rowKeys){
  return (dispatch, getState) => {

    var state = getState()
    var tests = state.testGrid.currentTask.tests
    var clonedTests = _.cloneDeep(tests)

    _.forEach(rowKeys, (rowKey) => {
      clonedTests[rowKey].delete = true
    })

    clonedTests = clonedTests.filter((test) => { return !test.delete })

    dispatch(taskTestsChange(clonedTests))
  }
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

function validateTests(task, dispatch){
  if(!task.outputFileName || task.outputFileName == ''){
    dispatch(outputFileNameError("Output file name field is required."))
    return false;
  }
  
  var testWithErrors = _.filter(task.tests, function(test){
    return !test.inputFile || !test.outputFile;
  })

  if(testWithErrors.length == 0)
    return true;

  dispatch(testsError("Not all test consists input and output file."));
  return false;
}

export function saveTask(){
  return(dispatch, getState) => {
    dispatch(resetErrors());

    var currentTask = getState().testGrid.currentTask;

    if(validateTests(currentTask, dispatch)){

      var token = getState().user.credentials.access_token
      requests.saveTask(token, currentTask)
      .then(function(response){
        browserHistory.push("/task/" + currentTask.id)
      })
    }
  }
}

export function preSaveTaskTest(row, cellName, cellValue){
  return (dispatch, getState) => {
    var taskId = getState().testGrid.currentTask.id
    var token = getState().user.credentials.access_token

    var filesIds = _.map(getState().testGrid.currentTask.tests, function(test){
      return [ 
        test.inputFile ? test.inputFile.id : null,
        test.outputFile ? test.outputFile.id : null ]
    })
    filesIds = [].concat.apply([], filesIds)
    filesIds = _.filter(filesIds, function(id){ return id && id != null })

    requests.saveTaskTest(token, taskId, filesIds, cellValue.file).then(function(response){
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
          test.inputFile.name = cellValue.file.name
          test.inputFile.error = null
        }
        else {
          test.outputFile.id = response.data
          test.outputFile.name = cellValue.file.name
          test.outputFile.error = null
        }
        clonedTests.push(test)
        dispatch(taskTestsChange(clonedTests))
      }
    }).catch(function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState);
      
      var tests = getState().testGrid.currentTask.tests || []
      var clonedTests = _.cloneDeep(tests)
      var test = _.find(clonedTests, function(test){
        return (test.inputFile && test.inputFile.tempId == cellValue.tempId)
        || (test.outputFile.tempId && test.outputFile.tempId == cellValue.tempId)
      })

      if(test){
        clonedTests.splice(clonedTests.indexOf(test), 1)
        if(test.inputFile && test.inputFile.tempId == cellValue.tempId){
          test.inputFile.error = errorMessage
        }
        else {
          test.outputFile.error = errorMessage
        }
        clonedTests.push(test)
        dispatch(taskTestsChange(clonedTests))
      }
    })
  }
}
