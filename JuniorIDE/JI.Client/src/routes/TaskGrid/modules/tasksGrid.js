import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SUBJECT_SUCCESS    = 'FETCH_SUBJECT_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------

export const fetchSubjectSuccess = (subject) => {
  return {
    type    : FETCH_SUBJECT_SUCCESS,
    payload : subject
  }
}

export const actions = {
  fetchSubjectSuccess
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SUBJECT_SUCCESS]   : (state, action) => {
    return Object.assign({}, state, { subject: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  subject     : null,
  isEditMode  : false
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
