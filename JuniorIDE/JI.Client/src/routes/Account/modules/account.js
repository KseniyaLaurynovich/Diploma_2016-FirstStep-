import requests from '../../../utils/requests'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const OLD_PASSWORD_CHANGED           = 'OLD_PASSWORD_CHANGED'
export const NEW_PASSWORD_CHANGED           = 'NEW_PASSWORD_CHANGED'
export const CONFIRM_NEW_PASSWORD_CHANGED   = 'CONFIRM_NEW_PASSWORD_CHANGED'
export const RESET_CHANGE_PASSWORD_ERRORS   = 'RESET_CHANGE_PASSWORD_ERRORS'
export const SET_IS_CHANGE_PASSWORD_LOADING = 'SET_IS_CHANGE_PASSWORD_LOADING'
export const SET_IS_CHANGE_PASSWORD_ERROR   = 'SET_IS_CHANGE_PASSWORD_ERROR'
export const CONFIRM_NEW_PASSWORD_ERROR     = 'CONFIRM_NEW_PASSWORD_ERROR'
export const SET_VALIDATION_STATE           = 'SET_VALIDATION_STATE'
export const SET_DETAILS_EDIT_MODE          = 'SET_DETAILS_EDIT_MODE'
export const USERNAME_CHANGED               = 'USERNAME_CHANGED'
// ------------------------------------
// Actions
// ------------------------------------

export const onConfirmNewPasswordChange = (event) => {
  return {
    type    : CONFIRM_NEW_PASSWORD_CHANGED,
    payload : event.target.value
  }
}

export const onNewPasswordChange = (event) => {
  return {
    type    : NEW_PASSWORD_CHANGED,
    payload : event.target.value
  }
}

export const onOldPasswordChange = (event) => {
  return {
    type    : OLD_PASSWORD_CHANGED,
    payload : event.target.value
  }
}

export const onUsernameChange = (event) => {
  return {
    type    : USERNAME_CHANGED,
    payload : event.target.value
  }
}

export const resetErrors = () => {
  return {
    type  : RESET_CHANGE_PASSWORD_ERRORS
  }
}

export const setIsLoading = (isLoading) => {
  return {
    type    : SET_IS_CHANGE_PASSWORD_LOADING,
    payload : isLoading
  }
}

export const setChangePasswordError = (error) => {
  return {
    type    : SET_IS_CHANGE_PASSWORD_ERROR,
    payload : error
  }
}

export const setConfirmNewPasswordError = (error) => {
  return {
    type    : CONFIRM_NEW_PASSWORD_ERROR,
    payload : error
  }
}

export const setValidationState = (state) => {
  return {
    type    : SET_VALIDATION_STATE,
    payload : state
  }
}

export const setDetailsEditMode = (isEditMode) => {
  return {
    type    : SET_DETAILS_EDIT_MODE,
    payload : isEditMode
  }
}



export const actions = {
  onUsernameChange,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  setDetailsEditMode
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DETAILS_EDIT_MODE]           : (state, action) => {
    return Object.assign({}, state, { isEditDetails: action.payload })
  },
  [USERNAME_CHANGED]                : (state, action) => {
    return Object.assign({}, state, { username: action.payload })
  },
  [OLD_PASSWORD_CHANGED]            : (state, action) => {
    return Object.assign({}, state, { oldPassword: action.payload })
  },
  [NEW_PASSWORD_CHANGED]            : (state, action) => {
    return Object.assign({}, state, { newPassword: action.payload })
  },
  [CONFIRM_NEW_PASSWORD_CHANGED]    : (state, action) => {
    return Object.assign({}, state, { confirmNewPassword: action.payload })
  },
  [RESET_CHANGE_PASSWORD_ERRORS]                     : (state, action) => {
    return Object.assign({}, state, { confirmNewPasswordError: null, changePasswordError: null, validationState: null })
  },
  [SET_IS_CHANGE_PASSWORD_LOADING]   : (state, action) => {
    return Object.assign({}, state, { isLoading: action.payload })
  },
  [SET_IS_CHANGE_PASSWORD_ERROR]     : (state, action) => {
    return Object.assign({}, state, { changePasswordError: action.payload })
  },
  [CONFIRM_NEW_PASSWORD_ERROR]       : (state, action) => {
    return Object.assign({}, state, { confirmNewPasswordError: action.payload })
  },
  [SET_VALIDATION_STATE]             : (state, action) => {
    return Object.assign({}, state, { validationState: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username                : null,
  oldPassword             : null,
  newPassword             : null,
  confirmNewPassword      : null,
  confirmNewPasswordError : null,
  validationState         : null,
  changePasswordError     : null,
  isEditDetails           : false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export function saveUsername(){

  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setIsLoading(true))

    var state = getState();

    var username = state.account.username;
    if(!username){
      dispatch(setUsernameError())
    }
    
    var passwordModel = {
      oldPassword       : state.account.oldPassword,
      newPassword       : state.account.newPassword,
      confirmPassword   : state.account.confirmNewPassword
    }

    if(passwordModel.oldPassword 
        || passwordModel.newPassword 
        || passwordModel.confirmPassword){

      if(validateModel(dispatch, passwordModel)){

        requests.changePassword(state.user.credentials.access_token, passwordModel).then(function(response){
        dispatch(setDetailsEditMode(false))

        //go to information page

        }, function(error){
          var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
          dispatch(setChangePasswordError(errorMessage))
        })
      }
      dispatch(setIsLoading(false))
    }
  }
}

export function savePassword(){

  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setIsLoading(true))

    var state = getState();

    var username = state.account.username;
    if(username){
      //todo change username
    }
    
    var passwordModel = {
      oldPassword       : state.account.oldPassword,
      newPassword       : state.account.newPassword,
      confirmPassword   : state.account.confirmNewPassword
    }

    if(passwordModel.oldPassword 
        || passwordModel.newPassword 
        || passwordModel.confirmPassword){

      if(validateModel(dispatch, passwordModel)){

        requests.changePassword(state.user.credentials.access_token, passwordModel).then(function(response){
        dispatch(setDetailsEditMode(false))

        //go to information page

        }, function(error){
          var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
          dispatch(setChangePasswordError(errorMessage))
        })
      }
      dispatch(setIsLoading(false))
    }
  }
}

function validateModel(dispatch, model){
  if(!model.oldPassword){
    dispatch(setChangePasswordError("'Old password' is empty"))
    return false
  }

  if(!model.oldPassword){
    dispatch(setChangePasswordError("'New password' is empty"))
    return false
  }

  if(!model.oldPassword){
    dispatch(setChangePasswordError("'Confirm password' is empty"))
    return false
  }

  if(model.newPassword != model.confirmPassword){
    dispatch(setChangePasswordError("Confirm password doesn't equals new password"))
    return false
  }

  return true
}
