import requests from '../../../utils/requests'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
import { fetchUserInfo, setUserInfo } from '../../../store/user'

// ------------------------------------
// Constants
// ------------------------------------
export const OLD_PASSWORD_CHANGED           = 'OLD_PASSWORD_CHANGED'
export const NEW_PASSWORD_CHANGED           = 'NEW_PASSWORD_CHANGED'
export const CONFIRM_NEW_PASSWORD_CHANGED   = 'CONFIRM_NEW_PASSWORD_CHANGED'
export const USERNAME_CHANGED               = 'USERNAME_CHANGED'
export const PHOTO_CHANGE                   = 'PHOTO_CHANGE'
export const FIRST_NAME_CHANGE              = 'FIRST_NAME_CHANGE'
export const LAST_NAME_CHANGE               = 'LAST_NAME_CHANGE'
export const PATRONYMIC_CHANGE              = 'PATRONYMIC_CHANGE'
export const EMAIL_CHANGE                   = 'EMAIL_CHANGE'

export const RESET_CHANGE_ACCOUNT_ERRORS    = 'RESET_CHANGE_ACCOUNT_ERRORS'
export const SET_CHANGE_ACCOUNT_ERROR       = 'SET_CHANGE_ACCOUNT_ERROR'

export const SET_DETAILS_EDIT_MODE          = 'SET_DETAILS_EDIT_MODE'
export const SET_PRIVATE_INFO_EDIT_MODE     = 'SET_PRIVATE_INFO_EDIT_MODE'

export const GET_ACCOUNT_GROUPS_SUCCESS     = 'GET_ACCOUNT_GROUPS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const onEmailChange = (event) => {
  return {
    type    : EMAIL_CHANGE,
    payload : event.target.value
  }
}

export const onPatronymicChange = (event) => {
  return {
    type    : PATRONYMIC_CHANGE,
    payload : event.target.value
  }
}

export const onLastNameChange = (event) => {
  return {
    type    : LAST_NAME_CHANGE,
    payload : event.target.value
  }
}

export const onFirstNameChange = (event) => {
  return {
    type    : FIRST_NAME_CHANGE,
    payload : event.target.value
  }
}

export const onPhotoChange = (file) => {
  return {
    type    : PHOTO_CHANGE,
    payload : file
  }
}

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

export const setPrivateInfoEditMode = (isEditMode) => {
  return {
    type    : SET_PRIVATE_INFO_EDIT_MODE,
    payload : isEditMode
  }
}

export const getGroupsSuccess = (groups) => {
  return {
    type    : GET_ACCOUNT_GROUPS_SUCCESS,
    payload : groups
  }
}

export const actions = {
  onUsernameChange,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  setDetailsEditMode,
  resetErrors,
  setChangeAccountError,
  setPrivateInfoEditMode,
  getGroupsSuccess,
  onPhotoChange,
  onPatronymicChange,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ACCOUNT_GROUPS_SUCCESS]      : (state, action) => {
    return Object.assign({}, state, { groups: action.payload })
  },
  [SET_PRIVATE_INFO_EDIT_MODE]      : (state, action) => {
    return Object.assign({}, state, { isPrivateInfoEditMode: action.payload })
  },
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
    return Object.assign({}, state, { saveAccountDetailsError: null })
  },
  [PHOTO_CHANGE]                    : (state, action) => {
    return Object.assign({}, state, { photo: action.payload })
  },
  [FIRST_NAME_CHANGE]                    : (state, action) => {
    return Object.assign({}, state, { firstName: action.payload })
  },
  [LAST_NAME_CHANGE]                    : (state, action) => {
    return Object.assign({}, state, { lastName: action.payload })
  },
  [PATRONYMIC_CHANGE]                    : (state, action) => {
    return Object.assign({}, state, { patronymic: action.payload })
  },
  [EMAIL_CHANGE]                    : (state, action) => {
    return Object.assign({}, state, { email: action.payload })
  },
  [SET_CHANGE_ACCOUNT_ERROR]        : (state, action) => {
    return Object.assign({}, state, 
    { 
      saveAccountDetailsError: action.append && state.error != null 
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
  firstName               : null,
  lastName                : null,
  patronymic              : null,
  photo                   : null,
  email                   : null,

  saveAccountDetailsError : null,
  savePrivateInfoError    : null,

  isEditDetails           : false,
  isPrivateInfoEditMode   : false,

  groups                  : []
}


export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


export function savePhoto(photo){
  return(dispatch, getState) => {
    
    helpers.getBase64(photo, function(error, result){
      dispatch(onPhotoChange(result));
    })
  }
}

export function handleGroupsChanges(groups){
  return (dispatch, getState) => {
    var userInfo = getState().user.userInfo;
    userInfo.groups = groups;

    var token = getState().user.credentials.access_token
    requests.editUser(token, userInfo).then(function(response){
      dispatch(setUserInfo(response.data))
    },function(error){})
  }
}

export function fetchGroups(){
  return (dispatch, getState) => {

    var token = getState().user.credentials.access_token

    requests.fetchGroups(token).then(function(response){

      dispatch(getGroupsSuccess(response.data))

    },function(error){
      //handle error
      dispatch(getGroupsSuccess([]))
    })

  }
}

export function saveAccountDetails(event){
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
        return
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
