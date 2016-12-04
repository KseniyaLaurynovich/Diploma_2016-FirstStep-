import * as types from '../constants/ActionTypes'

export function  loginSuccess(username, jwt, roles, expires){
  return{
    type: types.LOGIN_SUCCESS,
    username,
    jwt,
    roles,
    expires,
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

export function logout(){
  return {
    type: types.LOGOUT
  }
}

export function getAllUsersSuccess(users){
  return{
    type: types.GET_ALL_USERS_SUCCESS,
    users
  }
}
