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
export const TASK_SHARED_TYPE_CHANGE  = 'TASK_SHARED_TYPE_CHANGE'
export const FETCH_TASK_SUCCESS       = 'FETCH_TASK_SUCCESS'
export const SET_TASK_VISIBILITY      = 'SET_TASK_VISIBILITY'
export const SET_EDIT_MODE            = 'SET_EDIT_MODE'
export const SAVE_TASK_SUCCESS        = 'SAVE_TASK_SUCCESS'
export const DELETE_TASK_CONFIRMATION_CHANGE = 'DELETE_TASK_CONFIRMATION_CHANGE'
export const DELETE_TASK_LOADING_CHANGE = 'DELETE_TASK_LOADING_CHANGE'

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

export const onSharedTypeChange = (event) => {
  return {
    type    : TASK_SHARED_TYPE_CHANGE,
    payload : event.target.checked
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

export const onDeleteLoadingChange = (isLoading) => {
  return {
    type    : DELETE_TASK_LOADING_CHANGE,
    payload : isLoading
  }
}

export const onDeleteConfirmation = (event) => {
  return {
    type    : DELETE_TASK_CONFIRMATION_CHANGE,
    payload : event.target.checked
  }
}

export const actions = {
  onNameChange,
  onDescriptionChange,
  onTestedTypeChange,
  onSharedTypeChange,
  fetchTaskSuccess,
  setEditMode,
  saveTaskSuccess,
  setTaskVisibility,
  onDeleteLoadingChange,
  onDeleteConfirmation
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
  [TASK_SHARED_TYPE_CHANGE] : (state, action) => {
    return Object.assign({}, state, { editingTask:
      Object.assign({}, state.editingTask, { isShared: action.payload })})
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
  },
  [DELETE_TASK_CONFIRMATION_CHANGE] : (state, action) => {
    return Object.assign({}, state, { deleteConfirmed: action.payload })
  },
  [DELETE_TASK_LOADING_CHANGE]      : (state, action) => {
    return Object.assign({}, state, { deleteLoading: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentTask           : {},
  editingTask           : null,
  isEditMode            : false,
  deleteConfirmed       : false,
  deleteLoading         : false
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
    },function(error){
      //todo handle error
    })
  }
}

export function deleteTask(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.deleteTask(token, getState().task.currentTask.id)
    .then(function(response){
      browserHistory.push('/' + getState().task.currentTask.subjectId + '/tasks')
    })
  }
}
