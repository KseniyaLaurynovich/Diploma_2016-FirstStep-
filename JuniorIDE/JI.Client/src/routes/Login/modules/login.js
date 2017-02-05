import requests from '../../../utils/requests'
import { validationStates } from '../../../utils/constants'
import { browserHistory } from 'react-router'
import { saveUserCredentials } from '../../../store/user'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_CHANGED                    = 'LOGIN_CHANGED'
export const PASSWORD_CHANGED                 = 'PASSWORD_CHANGED'
export const ISREMEMBER_CHANGED               = 'ISREMEMBER_CHANGED'
export const LOGIN_VALIDATIONSTATE_CHANGED    = 'LOGIN_VALIDATIONSTATE_CHANGED'
export const SET_ISLOADING                    = 'SET_ISLOADING'
export const LOGIN_REQUEST_FAILED             = 'LOGIN_REQUEST_FAILED'
// ------------------------------------
// Actions
// ------------------------------------
export const handleLoginChange = (event) => {
  return {
    type    : LOGIN_CHANGED,
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

export const setValidationState = (state) => {
  return {
    type    : LOGIN_VALIDATIONSTATE_CHANGED,
    payload : state
  }
}

export const setIsLoading = (isLoading) => {
  return {
    type    : SET_ISLOADING,
    payload : isLoading
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

    dispatch(setIsLoading(true))
    var data = getState().login;

    requests.getToken({username: data.login, password: data.password})
    .then(function(response){

      const userData = {
        username: response.data.userName,
        roles: response.data.roles,
        access_token: response.data.access_token,
        expires: response.data['.expires']
      }
      dispatch(setValidationState(validationStates.success))
      dispatch(saveUserCredentials(userData, data.isRemember))
      dispatch(setIsLoading(false))

      browserHistory.push('/')

    }, function(error){
      dispatch(loginFailed(error.response.data.error_description))
      dispatch(setValidationState(validationStates.error))
      dispatch(setIsLoading(false))
    })
  }
}

export const actions = {
  login,
  handleIsRememberChange,
  handlePasswordChange,
  handleLoginChange
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST_FAILED]            : (state, action) => {
      return Object.assign({}, state, { loginError: action.payload })
  },
  [LOGIN_CHANGED]                   : (state, action) => {
    return Object.assign({}, state, { login: action.payload })
  },
  [PASSWORD_CHANGED]                : (state, action) => {
    return Object.assign({}, state, { password: action.payload })
  },
  [ISREMEMBER_CHANGED]              : (state, action) => {
    return Object.assign({}, state, { isRemember: action.payload })
  },
  [LOGIN_VALIDATIONSTATE_CHANGED]   : (state, action) => {
    return Object.assign({}, state, { validationState: action.payload })
  },
  [SET_ISLOADING]                   : (state, action) => {
    return Object.assign({}, state, { isLoading: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  login              : null,
  password           : null,
  isRemember         : false,
  validationState    : null,
  loginError         : null,
  isLoading          : false
}

export default function loginReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
