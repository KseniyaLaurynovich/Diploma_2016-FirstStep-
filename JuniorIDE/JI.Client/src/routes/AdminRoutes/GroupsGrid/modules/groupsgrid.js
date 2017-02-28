import requests from '../../../../utils/requests'
import helpers from '../../../../utils/helpers'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUPS_SUCCESS            = 'FETCH_GROUPS_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------

export const fetchGroupsSuccess = (groups) => {
  return {
    type    : FETCH_GROUPS_SUCCESS,
    payload : groups
  }
}

export function fetchGroups(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchGroups(token).then(function(response){
      dispatch(fetchGroupsSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchGroupsSuccess([]))
    })
  }
}

export const actions = {
  fetchGroups
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_GROUPS_SUCCESS]    : (state, action) => {
    return Object.assign({}, state, { groups: action.payload })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  groups: []
}

export default function usersGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
