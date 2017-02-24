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
export const SET_DELETE_SUBJECT_CONFIRMED   = 'SET_DELETE_SUBJECT_CONFIRMED'
export const DELETE_SUBJECT_IS_LOADING      = 'DELETE_SUBJECT_IS_LOADING'
export const DELETE_SUBJECT_SUCCESS         = 'DELETE_SUBJECT_SUCCESS'
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
    payload : { showEditModal: show, currentSubject: subject, deleteConfirmed: false }
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

export const saveEditSubjectSuccess = (subject) => {
  return {
    type    : SAVE_EDITED_SUBJECT_SUCCESS,
    payload : subject
  }
}

export const resetErrors = () => {
  return {
    type    : EDIT_SUBJECT_RESET_ERRORS
  }
}

export const setSaveEditUserLoading = (isLoading) => {
  return {
    type    : SAVE_EDITED_SUBJECT_IS_LOADING,
    payload : isLoading
  }
}

export const onDeleteConfirmation = (event) => {
  return {
    type    : SET_DELETE_SUBJECT_CONFIRMED,
    payload : event.target.checked
  }
}

export const setDeleteSubjectLoading = (isLoading) => {
  return {
    type    : DELETE_SUBJECT_IS_LOADING,
    payload : isLoading
  }
}

export const deleteSubjectSuccess = () => {
  return {
    type    : DELETE_SUBJECT_SUCCESS
  }
}

export function saveEditedSubject(event){
    event.preventDefault()
    return(dispatch, getState) => {
      dispatch(resetErrors())
      dispatch(setSaveEditUserLoading(true))

      var subject = getState().subjectsgrid.currentSubject
      var token = getState().user.credentials.access_token
      requests.saveSubject(token, subject).then(function(response){
        dispatch(saveEditSubjectSuccess(response.data))
        dispatch(setSaveSubjectLoading(false))
        dispatch(setEditModalShowing(null, false))
      },function(error){
        var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

        dispatch(saveEditSubjectFailed(errorMessage))
        dispatch(setSaveSubjectLoading(false))
      })
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

export function onDeleteSubject(){
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch(setDeleteSubjectLoading(true))

    var subjectId = getState().subjectsgrid.currentSubject.id
    var token = getState().user.credentials.access_token
    requests.deleteSubject(token, subjectId).then(function(response){
      dispatch(deleteSubjectSuccess())
      dispatch(setDeleteSubjectLoading(false))
      dispatch(setEditModalShowing(null, false))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      //todo handle error
    })
  }
}

export const actions = {
  fetchSubjects,
  setEditModalShowing,
  onSubjectNameChange,
  saveEditedSubject,
  onDeleteSubject,
  onDeleteConfirmation
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
  },
  [SAVE_EDITED_SUBJECT_SUCCESS] : (state, action) => {
    var subjects = _.cloneDeep(state.subjects)
    if(!state.currentSubject.id){
      subjects.push(action.payload)
    }else{
      var subjectId = state.currentSubject.id
      var subject = subjects.find((s) => {
        return s.id === subjectId
      });

      var subjectIndex = subjects.indexOf(subject)
      subjects[subjectIndex] = action.payload
    }

    return Object.assign({}, state, { subjects: subjects } )
  },
  [SET_DELETE_SUBJECT_CONFIRMED] : (state, action) => {
    return Object.assign({}, state, { deleteConfirmed: action.payload } )
  },
  [DELETE_SUBJECT_IS_LOADING] : (state, action) => {
    return Object.assign({}, state, { deleteSubjectLoading: action.payload } )
  },
  [DELETE_SUBJECT_SUCCESS] : (state, action) => {
    var subjectId = state.currentSubject.id
    var subjects = _.cloneDeep(state.subjects)
    var subject = subjects.find((s) => {
      return s.id === subjectId
    });

    var subjectIndex = subjects.indexOf(subject)
    subjects.splice(subjectIndex, 1)

    return Object.assign({}, state, { subjects: subjects } )
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  subjects              : [],
  currentSubject        : null,
  showEditModal         : false,
  saveSubjectError      : null,
  saveSubjectLoading    : null,
  deleteConfirmed       : false,
  deleteSubjectLoading  : false
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
