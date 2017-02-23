import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SUBJECTS_SUCCESS           = 'GET_SUBJECTS_SUCCESS'
export const SUBJECT_NAME_CHANGE            = 'SUBJECT_NAME_CHANGE'
export const SET_SUBJECT_EDIT_MODAL_SHOWING = 'SET_SUBJECT_EDIT_MODAL_SHOWING'
export const SAVE_EDITED_SUBJECT_IS_LOADING = 'SAVE_EDITED_SUBJECT_IS_LOADING'
export const SAVE_EDITED_SUBJECT_FAILED     = 'SAVE_EDITED_SUBJECT_FAILED'
export const SAVE_EDITED_SUBJECT_SUCCESS    = 'SAVE_EDITED_SUBJECT_SUCCESS'
export const EDIT_SUBJECT_RESET_ERRORS      = 'EDIT_SUBJECT_RESET_ERRORS'
// ------------------------------------
// Actions
// ------------------------------------

export const fetchSubjectsSuccess = (subjects) => {
  return {
    type    : GET_SUBJECTS_SUCCESS,
    payload : subjects
  }
}

export const onSubjectNameChange = (event) => {
  return {
    type    : SUBJECT_NAME_CHANGE,
    payload : event.target.value
  }
}

export const setEditModalShowing = (show, subject) => {
  return {
    type    : SET_SUBJECT_EDIT_MODAL_SHOWING,
    payload : { showEditModal: show, currentSubject: subject }
  }
}

export const setSaveSubjectLoading = (isLoading) => {
  return {
    type    : SAVE_EDITED_SUBJECT_IS_LOADING,
    payload : isLoading
  }
}

export const saveEditSubjectFailed = (error) => {
  return {
    type    : SAVE_EDITED_SUBJECT_FAILED,
    payload : error
  }
}

export const saveEditSubjectSuccess = () => {
  return {
    type    : SAVE_EDITED_SUBJECT_SUCCESS
  }
}

export const resetErrors = () => {
  return {
    type    : EDIT_SUBJECT_RESET_ERRORS
  }
}

export function fetchSubjects(){
  return(dispatch, getState) => {
    var token = getState().user.credentials.access_token

    requests.fetchSubjectsForTeacher(token).then(function(response){
      dispatch(fetchSubjectsSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchSubjectsSuccess([]))
    })
  }
}

export const actions = {
  fetchSubjects
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBJECT_NAME_CHANGE]       :(state, action) => {
    return Object.assign({}, state, { currentSubject:
      Object.assign({}, state.currentSubject, { name: action.payload })})
  },
  [GET_SUBJECTS_SUCCESS]      : (state, action) => {
    return Object.assign({}, state, { subjects: action.payload })
  },
  [SET_SUBJECT_EDIT_MODAL_SHOWING]  : (state, action) => {
    return Object.assign({}, state, action.payload )
  },
  [SAVE_EDITED_SUBJECT_IS_LOADING] : (state, action) => {
    return Object.assign({}, state, { saveSubjectLoading: action.payload } )
  },
  [SAVE_EDITED_SUBJECT_FAILED] : (state, action) => {
    return Object.assign({}, state, { saveSubjectError: action.payload } )
  },
  [EDIT_SUBJECT_RESET_ERRORS] : (state, action) => {
    return Object.assign({}, state, { saveSubjectError: null } )
  }
  //todo SAVE_EDITED_SUBJECT_SUCCESS
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  subjects            : [],
  currentSubject      : null,
  showEditModal       : false,
  saveSubjectError    : null,
  saveSubjectLoading  : null
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
