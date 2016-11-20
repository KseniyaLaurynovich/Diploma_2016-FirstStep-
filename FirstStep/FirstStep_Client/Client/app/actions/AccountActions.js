import * as types from '../constants/ActionTypes'

export function  loginSuccess(username, jwt, roles){
  return{
    type: types.LOGIN_SUCCESS,
    username,
    jwt,
    roles,
    isAuthenticated: true
  }
}

export function  loginFailed(loginError){
  return{
    type: types.LOGIN_FAILED,
    loginError
  }
}

export function  registrationFailed(registrationError){
  return{
    type: types.REGISTRATION_FAILED,
    registrationError
  }
}
