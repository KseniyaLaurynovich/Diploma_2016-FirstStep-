import requests from '../utils/requests'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export const SET_USER_INFO = 'SET_USER_INFO'
// ------------------------------------
// Actions
// ------------------------------------

export const setUserCredentials = (credentials, isAuthenticated) => {
  return {
    type: SET_CREDENTIALS,
    payload: {credentials : credentials, isAuthenticated : isAuthenticated }
  }
}

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo
  }
}

export const actions = {
  setUserCredentials
}

// ------------------------------------
// Functions
// ------------------------------------

//todo authorize user with param login + password?

export function saveUserCredentials(credentials, isRemember){
  return (dispatch, getState) => {
    dispatch(setUserCredentials(credentials, true))

    if(isRemember){
      var userInfo = getState().user.credentials
      localStorage.setItem('user', JSON.stringify(userInfo))
    }
  }
}

export function fetchUserInfo(){
  return (dispatch, getState) => {
    var token = getState().user.access_token
    if(access_token != null){
      requests.fetchUserInfo(token).then(function(response){
        dispatch(setUserInfo(response.data))
      })
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_CREDENTIALS] : (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [SET_USER_INFO]   : (state, action) => {
    return Object.assign({}, state, { userInfo : action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function getInitialState () {
  var credentials = JSON.parse(localStorage.getItem('user'))
  return {
    credentials,
    userInfo           : null,
    isAuthenticated    : credentials != null
  }
}

const initialState = getInitialState()

export default function userReducer(state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
