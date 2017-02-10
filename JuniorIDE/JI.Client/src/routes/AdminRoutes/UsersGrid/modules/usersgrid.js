import requests from '../../../../utils/requests'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchUsersSuccess = (users) => {
  return {
    type    : FETCH_USERS_SUCCESS,
    payload : users
  }
}

export const fetchRolesSuccess = (roles) => {
  return {
    type    : FETCH_ROLES_SUCCESS,
    payload : roles
  }
}

export function fetchRoles(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchRoles(token).then(function(response){
      dispatch(fetchRolesSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchUsersSuccess([]))
    })
  }
}

export function fetchUsers(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchUsers(token).then(function(response){
      dispatch(fetchUsersSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchUsersSuccess([]))
    })
  }
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USERS_SUCCESS]       : (state, action) => {
    return Object.assign({}, state, { users: action.payload })
  },
  [FETCH_ROLES_SUCCESS]       : (state, action) => {
    return Object.assign({}, state, { roles: action.payload })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users   : [],
  roles   : []
}

export default function usersGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
