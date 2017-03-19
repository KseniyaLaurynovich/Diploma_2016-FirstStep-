import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SUBJECT_SUCCESS            = 'FETCH_SUBJECT_SUCCESS'
export const NEW_TASK_NAME_CHANGE             = 'NEW_TASK_NAME_CHANGE'
export const NEW_TASK_MODAL_VISIBILITY_CHANGE = 'NEW_TASK_MODAL_VISIBILITY_CHANGE'
export const NEW_TASK_SAVE_ERROR_CHANGE       = 'NEW_TASK_SAVE_ERROR_CHANGE'
export const NEW_TASK_SAVE_LOADING_CHANGE     = 'NEW_TASK_SAVE_LOADING_CHANGE'
export const SUBJECT_TASKS_CHANGE             = 'SUBJECT_TASKS_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchSubjectSuccess = (subject) => {
  return {
    type    : FETCH_SUBJECT_SUCCESS,
    payload : subject
  }
}

export const onNewTaskNameChange = (event) => {
  return {
    type    : NEW_TASK_NAME_CHANGE,
    payload : event.target.value
  }
}

export const onNewTaskModalVisibilityChange = (isVisible) => {
  return {
    type    : NEW_TASK_MODAL_VISIBILITY_CHANGE,
    payload : isVisible
  }
}

export const onNewTaskSaveErrorChange = (error) => {
  return {
    type    : NEW_TASK_SAVE_ERROR_CHANGE,
    payload : error
  }
}

export const onNewTaskSaveLoadingChange = (error) => {
  return {
    type    : NEW_TASK_SAVE_LOADING_CHANGE,
    payload : error
  }
}

export const onSubjectTasksChange = (tasks) => {
  return {
    type    : SUBJECT_TASKS_CHANGE,
    payload : tasks
  }
}

export const actions = {
  fetchSubjectSuccess,
  onNewTaskNameChange,
  onNewTaskModalVisibilityChange,
  onNewTaskSaveErrorChange,
  onNewTaskSaveLoadingChange,
  onSubjectTasksChange
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SUBJECT_SUCCESS]            : (state, action) => {
    return Object.assign({}, state, { subject: action.payload })
  },
  [NEW_TASK_NAME_CHANGE]             : (state, action) => {
    return Object.assign({}, state, { newTaskName : action.payload })
  },
  [NEW_TASK_MODAL_VISIBILITY_CHANGE] : (state, action) => {
    return Object.assign({}, state, { showNewTaskModal : action.payload, newTaskName: null })
  },
  [NEW_TASK_SAVE_ERROR_CHANGE]       : (state, action) => {
    return Object.assign({}, state, { createNewTaskError : action.payload })
  },
  [NEW_TASK_SAVE_LOADING_CHANGE]     : (state, action) => {
    return Object.assign({}, state, { saveNewTaskLoading : action.payload })
  },
  [SUBJECT_TASKS_CHANGE]             : (state, action) => {
    return Object.assign({}, state, { subject:
      Object.assign({}, state.subject, { tasks: action.payload })})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  subject             : null,
  showNewTaskModal    : false,
  createNewTaskError  : null,
  saveNewTaskLoading  : false,
  newTaskName         : null
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function fetchSubject(subjectId){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchSubjectById(token, subjectId).then(function(response){
      dispatch(fetchSubjectSuccess(response.data))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      //todo handle error
    })
  }
}

export function openNewTaskModal(){
  return (dispatch, getState) => {
    dispatch(onNewTaskSaveLoadingChange(false))
    dispatch(onNewTaskSaveErrorChange(null))
    dispatch(onNewTaskModalVisibilityChange(true))
  }
}

export function closeNewTaskModal(){
  return (dispatch, getState) => {
    dispatch(onNewTaskModalVisibilityChange(false))
  }
}

export function saveNewTask(event){
  event.preventDefault()

  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token

    dispatch(onNewTaskSaveLoadingChange(true))

    var task = {
      name      : getState().tasksGrid.newTaskName,
      subjectId : getState().tasksGrid.subject.id
     }

    requests.saveTask(token,task )
    .then(function(response){

      var clonedTasks = _.cloneDeep(getState().tasksGrid.subject.tasks || [])
      clonedTasks.push(response.data)

      dispatch(onSubjectTasksChange(clonedTasks))
      dispatch(onNewTaskSaveLoadingChange(false))
      dispatch(onNewTaskModalVisibilityChange(false))

    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      dispatch(onNewTaskSaveErrorChange(errorMessage))
      dispatch(onNewTaskSaveLoadingChange(false))
    })
  }
}
