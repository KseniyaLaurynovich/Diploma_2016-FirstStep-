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
// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

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

export function changePassword(event){
  event.preventDefault();

  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setIsLoading(true))

    var state = getState();
    var data = {
      oldPassword       : state.changepassword.oldPassword,
      newPassword       : state.changepassword.newPassword,
      confirmPassword   : state.changepassword.confirmNewPassword
    }

    if(validateModel(dispatch, data)){

      requests.changePassword(state.user.credentials.access_token, data).then(function(response){
      dispatch(setValidationState(validationStates.success))
      dispatch(setIsLoading(false))

      //go to information page

      }, function(error){
        var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

        dispatch(setValidationState(validationStates.error))
        dispatch(setChangePasswordError(errorMessage))
        dispatch(setIsLoading(false))
      })
    }
    dispatch(setIsLoading(false))
  }
}

function validateModel(dispatch, model){
  var isValid = true;

  if(model.newPassword != model.confirmPassword){
    dispatch(setConfirmNewPasswordError("Confirm password doesn't equals new password"))
    isValid = false
  }

  return isValid
}

export const actions = {
  changePassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  oldPassword             : null,
  newPassword             : null,
  confirmNewPassword      : null,
  confirmNewPasswordError : null,
  validationState         : null,
  changePasswordError     : null,
  isLoading               : false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
