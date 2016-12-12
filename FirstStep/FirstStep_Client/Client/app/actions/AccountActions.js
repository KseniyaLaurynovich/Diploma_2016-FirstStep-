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

export function setEditUserDialogVisibility(visible, user) {
  return {
    type: types.CHANGE_EDIT_USER_DIALOG_VISIBILITY,
    currentUser: user,
    isEditing: visible
  }
}

export function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  }
}

export function setDeleteUserDialogVisibility(visible, user) {
  return {
    type: types.CHANGE_DELETE_USER_DIALOG_VISIBILITY,
    currentUser: user,
    isDeleting: visible
  }
}

export function deleteUserSuccess(user){
  return{
    type: types.DELETE_USER_SUCCESS,
    user
  }
}

export function setManageRolesDialogVisibility(visibility, user){
  return{
    type: types.CHANGE_MANAGE_ROLES_DIALOG_VISIBILITY,
    isManagingRoles: visibility,
    user
  }
}

export function getAllRolesSuccess(roles){
  return{
    type: types.GET_ROLES_SUCCESS,
    roles
  }
}

export function assignRoleSuccess(user){
  return{
    type: types.ASSIGN_ROLE_SUCCESS,
    user
  }
}

export function unassignRoleSuccess(user){
  return{
    type: types.UNASSIGN_ROLE_SUCCESS,
    user
  }
}
