import requests from '../../../utils/requests'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
import { fetchUserInfo } from '../../../store/user'

// ------------------------------------
// Constants
// ------------------------------------
export const OLD_PASSWORD_CHANGED           = 'OLD_PASSWORD_CHANGED'
export const NEW_PASSWORD_CHANGED           = 'NEW_PASSWORD_CHANGED'
export const CONFIRM_NEW_PASSWORD_CHANGED   = 'CONFIRM_NEW_PASSWORD_CHANGED'
export const USERNAME_CHANGED               = 'USERNAME_CHANGED'
export const RESET_CHANGE_ACCOUNT_ERRORS    = 'RESET_CHANGE_ACCOUNT_ERRORS'
export const SET_CHANGE_ACCOUNT_ERROR       = 'SET_CHANGE_ACCOUNT_ERROR'
export const SET_DETAILS_EDIT_MODE          = 'SET_DETAILS_EDIT_MODE'

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
    type  : RESET_CHANGE_ACCOUNT_ERRORS
  }
}

export const setChangeAccountError = (error, append = false) => {
  return {
    type    : SET_CHANGE_ACCOUNT_ERROR,
    payload : error,
    append
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
  setDetailsEditMode,
  resetErrors,
  setChangeAccountError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DETAILS_EDIT_MODE]           : (state, action) => {
    return Object.assign({}, state, { isEditDetails: action.payload, username: null, newPassword: null, oldPassword: null, confirmNewPassword: null })
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
  [RESET_CHANGE_ACCOUNT_ERRORS]     : (state, action) => {
    return Object.assign({}, state, { saveError: null })
  },
  [SET_CHANGE_ACCOUNT_ERROR]        : (state, action) => {
    return Object.assign({}, state, 
    { 
      saveError: action.append && state.error != null 
            ? state.error + ' ' + action.payload 
            : action.payload 
    })
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
  saveError               : null,
  isEditDetails           : false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export function save(event){
  event.preventDefault()

  return (dispatch, getState) => {
    dispatch(resetErrors())

    var state = getState();

    if(state.account.username != null){
      var usernameModel = {
        username: state.account.username
      }

      requests.changeUsername(state.user.credentials.access_token, usernameModel).then(function(response){
      dispatch(setDetailsEditMode(false))
      dispatch(fetchUserInfo())

      }, function(error){
        var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
        dispatch(setChangeAccountError(errorMessage, true))
      })
    }

    if(state.account.oldPassword || state.account.newPassword || state.account.confirmNewPassword){
      var passwordModel = {
        oldPassword       : state.account.oldPassword,
        newPassword       : state.account.newPassword,
        confirmPassword   : state.account.confirmNewPassword
      }

      var passwordModelValidationError = getPasswordModelValidationError(passwordModel);
      if(passwordModelValidationError == null){

        requests.changePassword(state.user.credentials.access_token, passwordModel).then(function(response){
           dispatch(setDetailsEditMode(false))
        }, function(error){
          var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
          dispatch(setChangeAccountError(errorMessage, true))
        })
      }else{
        dispatch(setChangeAccountError(passwordModelValidationError, true))
      }
    }

    if(!state.account.username && !state.account.oldPassword 
    && !state.account.newPassword && !state.account.confirmNewPassword){
      dispatch(setDetailsEditMode(false))
    }
    
  }
}

function getPasswordModelValidationError(model){
  if(!model.oldPassword){
    return "'Old password' is empty"
  }

  if(!model.oldPassword){
    return "'New password' is empty"
  }

  if(!model.oldPassword){
    return "'Confirm password' is empty"
  }

  if(model.newPassword != model.confirmPassword){
    return "Confirm password doesn't equals new password"
  }

  return null
}
