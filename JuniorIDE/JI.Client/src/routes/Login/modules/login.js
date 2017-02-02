import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { saveUserCredentials } from '../../../store/user'
// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_CHANGED       = 'USERNAME_CHANGED'
export const PASSWORD_CHANGED       = 'PASSWORD_CHANGED'
export const ISREMEMBER_CHANGED     = 'ISREMEMBER_CHANGED'
export const LOGINSTATE_CHANGED     = 'LOGINSTATE_CHANGED'

export const LOGIN_REQUEST_FAILED   = 'LOGIN_REQUEST_FAILED'

// ------------------------------------
// Actions
// ------------------------------------
export const handleUsernameChange = (event) => {
  return {
    type    : USERNAME_CHANGED,
    payload : event.target.value
  }
}

export const handlePasswordChange = (event) => {
  return {
    type    : PASSWORD_CHANGED,
    payload : event.target.value
  }
}

export const handleIsRememberChange = (event) => {
  return {
    type    : ISREMEMBER_CHANGED,
    payload : event.target.value == "on" ? true : false
  }
}

export const setLoginState = (loginState) => {
  return {
    type    : LOGINSTATE_CHANGED,
    payload : loginState
  }
}

export const loginFailed = (errorInfo) => {
  return {
    type    : LOGIN_REQUEST_FAILED,
    payload : errorInfo
  }
}

export function login(e){
  e.preventDefault();

  return (dispatch, getState) => {

    dispatch(setLoginState('loading'))
    var data = getState().login;

    requests.getToken({username: data.username, password: data.password})
    .then(function(response){

      const userData = {
        username: response.data.userName,
        roles: response.data.roles,
        access_token: response.data.access_token,
        expires: response.data['.expires']
      }
      dispatch(setLoginState('success'))
      dispatch(saveUserCredentials(userData, data.isRemember))

      browserHistory.push('/')

    }, function(error){
      dispatch(loginFailed(error.response.data.error_description))
      dispatch(setLoginState('error'))
    })
  }
}

export const actions = {
  login,
  handleIsRememberChange,
  handlePasswordChange,
  handleUsernameChange
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST_FAILED]  : (state, action) => {
      return Object.assign({}, state, { loginError: action.payload })
  },
  [USERNAME_CHANGED]      : (state, action) => {
    return Object.assign({}, state, { username: action.payload })
  },
  [PASSWORD_CHANGED]      : (state, action) => {
    return Object.assign({}, state, { password: action.payload })
  },
  [ISREMEMBER_CHANGED]    : (state, action) => {
    return Object.assign({}, state, { isRemember: action.payload })
  },
  [LOGINSTATE_CHANGED]        : (state, action) => {
    return Object.assign({}, state, { loginState: action.payload })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username      : null,
  password      : null,
  isRemember    : false,
  loginState    : null,
  loginError    : null
}

export default function loginReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
