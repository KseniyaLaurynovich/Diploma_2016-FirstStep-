import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_CHANGED         = 'USERNAME_CHANGED'
export const PASSWORD_CHANGED         = 'PASSWORD_CHANGED'
export const CONFIRM_PASSWORD_CHANGED = 'CONFIRM_PASSWORD_CHANGED'
export const FIRST_NAME_CHANGED       = 'FIRST_NAME_CHANGED'
export const LAST_NAME_CHANGED        = 'LAST_NAME_CHANGED'
export const PATRONYMIC_CHANGED       = 'PATRONYMIC_CHANGED'
export const EMAIL_CHANGED            = 'EMAIL_CHANGED'

export const SET_REGISTRATION_STATE     = 'SET_REGISTRATION_STATE'
export const SET_REGISTRATION_ERROR     = 'SET_REGISTRATION_ERROR'
export const SET_CONFIRM_PASSWORD_ERROR = 'SET_CONFIRM_PASSWORD_ERROR'
export const RESET_ERRORS               = 'RESET_ERRORS'

export const REGISTRATION_FAILED      = 'REGISTRATION_FAILED'

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

export const handleConfirmPasswordChange = (event) => {
  return {
    type    : CONFIRM_PASSWORD_CHANGED,
    payload : event.target.value
  }
}

export const handleFirstNameChange = (event) => {
  return {
    type    : FIRST_NAME_CHANGED,
    payload : event.target.value
  }
}

export const handleLastNameChange = (event) => {
  return {
    type    : LAST_NAME_CHANGED,
    payload : event.target.value
  }
}

export const handlePatronymicChange = (event) => {
  return {
    type    : PATRONYMIC_CHANGED,
    payload : event.target.value
  }
}

export const handleEmailChange = (event) => {
  return {
    type    : EMAIL_CHANGED,
    payload : event.target.value
  }
}

export const setConfirmPasswordError = (error) => {
  return {
    type    : SET_CONFIRM_PASSWORD_ERROR,
    payload : error
  }
}

export const setRegistrationError = (error) => {
  return {
    type    : SET_REGISTRATION_ERROR,
    payload : error
  }
}

export const setRegistrationState = (state) => {
  return {
    type    : SET_REGISTRATION_STATE,
    payload : state
  }
}

export const resetErrors = () => {
  return {
    type  : RESET_ERRORS
  }
}

export function registration(e){
  e.preventDefault();

  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setRegistrationState('loading'))

    var data = getState().registration;
    var dataUser = {
      username        : data.username,
      firstname       : data.firstname,
      lastname        : data.lastname,
      patronymic      : data.patronymic,
      email           : data.email,
      password        : data.password,
      confirmPassword : data.confirmPassword
    }

    if(validateRegistrationModel(dispatch, dataUser)){

      requests.registerUser(dataUser).then(function(response){
      dispatch(setRegistrationState('success'))
      browserHistory.push('/login')

      }, function(error){

        var errorMessage = ""
        for (var property in error.response.data.ModelState) {
          errorMessage += error.response.data.ModelState[property].join('\n')
        }
        dispatch(setRegistrationState('error'))
        dispatch(setRegistrationError(errorMessage))
      })
    }
  }
}

function validateRegistrationModel(dispatch, registrationModel){
  var isValid = true;

  if(registrationModel.password != registrationModel.confirmPassword){
    dispatch(setConfirmPasswordError("Confirm password doesn't equals password"))
    isValid = false
  }

  return isValid
}

export const actions = {
  registration,
  handleEmailChange,
  handleUsernameChange,
  handleConfirmPasswordChange,
  handlePasswordChange,
  handleFirstNameChange,
  handleLastNameChange,
  handlePatronymicChange
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
[USERNAME_CHANGED]            : (state, action) => {
    return Object.assign({}, state, { username: action.payload })
  },
  [PASSWORD_CHANGED]          : (state, action) => {
    return Object.assign({}, state, { password: action.payload })
  },
  [CONFIRM_PASSWORD_CHANGED]  : (state, action) => {
    return Object.assign({}, state, { confirmPassword: action.payload })
  },
  [EMAIL_CHANGED]             : (state, action) => {
    return Object.assign({}, state, { email: action.payload })
  },
  [FIRST_NAME_CHANGED]        : (state, action) => {
    return Object.assign({}, state, { firstname: action.payload })
  },
  [LAST_NAME_CHANGED]         : (state, action) => {
    return Object.assign({}, state, { lastname: action.payload })
  },
  [PATRONYMIC_CHANGED]        : (state, action) => {
    return Object.assign({}, state, { patronymic: action.payload })
  },
  [SET_CONFIRM_PASSWORD_ERROR] : (state, action) => {
    return Object.assign({}, state, { confirmPasswordError: action.payload })
  },
  [RESET_ERRORS]                : (state, action) => {
    return Object.assign({}, state, { confirmPasswordError: null})
  },
  [SET_REGISTRATION_ERROR]      : (state, action) => {
    return Object.assign({}, state, { registrationError: action.payload})
  },
  [SET_REGISTRATION_STATE]      : (state, action) => {
    return Object.assign({}, state, { registrationState: action.payload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username            : null,
  email               : null,
  firstname           : null,
  lastname            : null,
  patronymic          : null,
  password            : null,
  confirmPassword     : null,
  confirmPasswordError: null,
  registrationError   : null,
  registrationState   : null
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
