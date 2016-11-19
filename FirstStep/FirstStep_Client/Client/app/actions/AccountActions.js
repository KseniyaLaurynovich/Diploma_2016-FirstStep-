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
