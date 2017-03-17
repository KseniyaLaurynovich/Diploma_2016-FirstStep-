import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const TASK_NAME_CHANGE         = 'TASK_NAME_CHANGE'
export const TASK_DESCRIPTION_CHANGE  = 'TASK_DESCRIPTION_CHANGE'
export const TASK_TESTED_TYPE_CHANGE  = 'TASK_TESTED_TYPE_CHANGE'
export const TASK_TESTS_CHANGE        = 'TASK_TESTS_CHANGE'
export const OUTPUT_TEST_DROP         = 'OUTPUT_TEST_DROP'
export const INPUT_TEST_DROP          = 'INPUT_TEST_DROP'
export const ADD_NEW_TEST             = 'ADD_NEW_TEST'
export const SET_ADD_NEW_TEST_ERROR   = 'SET_ADD_NEW_TEST_ERROR'
export const FETCH_TASK_SUCCESS       = 'FETCH_TASK_SUCCESS'
export const SET_TASK_VISIBILITY      = 'SET_TASK_VISIBILITY'
export const SET_EDIT_MODE            = 'SET_EDIT_MODE'
export const SAVE_TASK_SUCCESS        = 'SAVE_TASK_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchTaskSuccess = (task) => {
  return {
    type    : FETCH_TASK_SUCCESS,
    payload : task
  }
}

export const onDescriptionChange = (event) => {
  return {
    type    : TASK_DESCRIPTION_CHANGE,
    payload : event.target.getContent()
  }
}

export const onNameChange = (event) => {
  return {
    type    : TASK_NAME_CHANGE,
    payload : event.target.value
  }
}

export const onTestedTypeChange = (event) => {
  return {
    type    : TASK_TESTED_TYPE_CHANGE,
    payload : event.target.checked
  }
}

export const onInputDrop = (file) => {
  return {
    type      : INPUT_TEST_DROP,
    payload   : { newInputFileTest: file }
  }
}

export const onOutputDrop = (file) => {
  return {
    type      : OUTPUT_TEST_DROP,
    payload   : { newOutputFileTest: file }
  }
}

export const onTestChange = (tests) => {
  return {
    type      : TASK_TESTS_CHANGE,
    payload   : tests
  }
}

export const setAddTestError = (error) => {
  return {
    type      : SET_ADD_NEW_TEST_ERROR,
    payload   : error
  }
}

export const setTaskVisibility = (isVisible) => {
  return {
    type    : SET_TASK_VISIBILITY,
    payload : isVisible
  }
}

export const setEditMode = (isEditMode, task) => {
  return {
    type    : SET_EDIT_MODE,
    payload : { isEditMode: isEditMode, editingTask: task }
  }
}

export const saveTaskSuccess = (task) => {
  return {
    type    : SAVE_TASK_SUCCESS,
    payload : task
  }
}

function inputFileChange(event){
  return (dispatch, getState) => {
    let reader = new FileReader();
    let file = event.currentTarget.files[0];

    reader.onload  = () => {
      dispatch(onInputDrop(reader.result))
    }
    reader.readAsBinaryString(file)
  }
}

function outputFileChange(event){
  return (dispatch, getState) => {
    let reader = new FileReader();
    let file = event.currentTarget.files[0];

    reader.onload  = () => {
      dispatch(onOutputDrop(reader.result))
    }
    reader.readAsBinaryString(file)
  }
}

export function saveNewTest(){
  return (dispatch, getState) => {
    dispatch(setAddTestError(''))
    var state = getState().taskEditForm

    if(!state.newInputFileTest || !state.newOutputFileTest){
      dispatch(setAddTestError('Input and output file required.'))
      return
    }

    var tests = state.task.tests
      ? _.cloneDeep(getState().taskEditForm.task.tests)
      : []

    tests.push({ inputFile: state.newInputFileTest, outputFile: state.newOutputFileTest})
    dispatch(onTestChange(tests))
    dispatch(onInputDrop(undefined))
    dispatch(onOutputDrop(undefined))
  }
}

export const actions = {
  onNameChange,
  onDescriptionChange,
  onTestedTypeChange,
  fetchTaskSuccess
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TASK_NAME_CHANGE]        : (state, action) => {
    return Object.assign({}, state, { editingTask:
      Object.assign({}, state.editingTask, { name: action.payload })})
  },
  [TASK_DESCRIPTION_CHANGE] : (state, action) => {
    return Object.assign({}, state, { editingTask:
      Object.assign({}, state.editingTask, { description: action.payload })})
  },
  [TASK_TESTED_TYPE_CHANGE] : (state, action) => {
    return Object.assign({}, state, { editingTask:
      Object.assign({}, state.editingTask, { autoTested: action.payload })})
  },
  [OUTPUT_TEST_DROP]      : (state, action) => {
    return Object.assign({}, state, action.payload )
  },
  [INPUT_TEST_DROP]       : (state, action) => {
    return Object.assign({}, state, action.payload )
  },
  [TASK_TESTS_CHANGE]     : (state, action) => {
    return Object.assign({}, state, { task:
      Object.assign({}, state.task, { tests: action.payload })})
  },
  [SET_ADD_NEW_TEST_ERROR]: (state, action) => {
    return Object.assign({}, state, { newTestError: action.payload } )
  },
  [FETCH_TASK_SUCCESS]    : (state, action) => {
    return Object.assign({}, state, { currentTask  : action.payload })
  },
  [SET_TASK_VISIBILITY]   : (state, action) => {
    return Object.assign({}, state, { currentTask:
      Object.assign({}, state.currentTask, { isVisible: action.payload })})
  },
  [SET_EDIT_MODE]         : (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [SAVE_TASK_SUCCESS]     : (state, action) => {
    return Object.assign({}, state, { currentTask: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentTask           : null,
  editingTask           : null,
  isEditMode            : false,
  newInputFileTest      : undefined,
  newOutputFileTest     : undefined,
  newTestError          : ''
}

export default function taskReducer (state = initialState, action){
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

export function toggleVisibility(){
  return (dispatch, getState) => {

    var state = getState();
    var token = state.user.credentials.access_token
    var taskId = state.task.currentTask.id
    var isVisible = !state.task.currentTask.isVisible

    requests.toggleTaskVisibility(token, taskId, isVisible).then(function(response){
      dispatch(setTaskVisibility(isVisible))
    })
  }
}

export function openEditMode(){
  return(dispatch, getState) => {
    dispatch(setEditMode(true, _.cloneDeep(getState().task.currentTask)))
  }
}

export function closeEditMode(){
  return(dispatch, getState) => {
    dispatch(setEditMode(false, null))
  }
}

export function saveTask(event){
  event.preventDefault()

  return(dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.saveTask(token, getState().task.editingTask)
    .then(function(response){
      dispatch(saveTaskSuccess(response.data))
      dispatch(setEditMode(false, null))
    })
  }
}
