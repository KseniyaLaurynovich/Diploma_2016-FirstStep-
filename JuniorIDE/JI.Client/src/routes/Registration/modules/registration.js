import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_CHANGED                         = 'USERNAME_CHANGED'
export const PASSWORD_CHANGED                         = 'PASSWORD_CHANGED'
export const CONFIRM_PASSWORD_CHANGED                 = 'CONFIRM_PASSWORD_CHANGED'
export const FIRST_NAME_CHANGED                       = 'FIRST_NAME_CHANGED'
export const LAST_NAME_CHANGED                        = 'LAST_NAME_CHANGED'
export const PATRONYMIC_CHANGED                       = 'PATRONYMIC_CHANGED'
export const EMAIL_CHANGED                            = 'EMAIL_CHANGED'
export const REGISTRATION_VALIDATIONSTATE_CHANGED     = 'REGISTRATION_VALIDATIONSTATE_CHANGED'
export const SET_REGISTRATION_ERROR                   = 'SET_REGISTRATION_ERROR'
export const SET_CONFIRM_PASSWORD_ERROR               = 'SET_CONFIRM_PASSWORD_ERROR'
export const SET_IS_REGISTRATION_LOADING              = 'SET_IS_REGISTRATION_LOADING'
export const RESET_REGISTRATION_ERRORS                             = 'RESET_REGISTRATION_ERRORS'
export const REGISTRATION_FAILED                      = 'REGISTRATION_FAILED'

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

export const setValidationState = (state) => {
  return {
    type    : REGISTRATION_VALIDATIONSTATE_CHANGED,
    payload : state
  }
}

export const setIsLoading = (state) => {
  return {
    type    : SET_IS_REGISTRATION_LOADING,
    payload : state
  }
}

export const resetErrors = () => {
  return {
    type  : RESET_REGISTRATION_ERRORS
  }
}

export function registration(e){
  e.preventDefault();

  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setIsLoading(true))

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

    if(validateModel(dispatch, dataUser)){

      requests.registerUser(dataUser).then(function(response){
      dispatch(setValidationState(validationStates.success))
      dispatch(setIsLoading(false))

      browserHistory.push('/login')

      }, function(error){
        var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

        dispatch(setValidationState(validationStates.error))
        dispatch(setRegistrationError(errorMessage))
        dispatch(setIsLoading(false))
      })
    }
  }
}

function validateModel(dispatch, model){
  var isValid = true;

  if(model.password != model.confirmPassword){
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
[USERNAME_CHANGED]                            : (state, action) => {
    return Object.assign({}, state, { username: action.payload })
  },
[PASSWORD_CHANGED]                            : (state, action) => {
    return Object.assign({}, state, { password: action.payload })
  },
[CONFIRM_PASSWORD_CHANGED]                    : (state, action) => {
    return Object.assign({}, state, { confirmPassword: action.payload })
  },
[EMAIL_CHANGED]                               : (state, action) => {
    return Object.assign({}, state, { email: action.payload })
  },
[FIRST_NAME_CHANGED]                          : (state, action) => {
    return Object.assign({}, state, { firstname: action.payload })
  },
[LAST_NAME_CHANGED]                           : (state, action) => {
    return Object.assign({}, state, { lastname: action.payload })
  },
[PATRONYMIC_CHANGED]                           : (state, action) => {
    return Object.assign({}, state, { patronymic: action.payload })
  },
[SET_CONFIRM_PASSWORD_ERROR]                   : (state, action) => {
    return Object.assign({}, state, { confirmPasswordError: action.payload })
  },
[RESET_REGISTRATION_ERRORS]                                 : (state, action) => {
    return Object.assign({}, state, { confirmPasswordError: null})
  },
[SET_REGISTRATION_ERROR]                       : (state, action) => {
    return Object.assign({}, state, { registrationError: action.payload})
  },
[REGISTRATION_VALIDATIONSTATE_CHANGED]         : (state, action) => {
    return Object.assign({}, state, { validationState: action.payload})
  },
[SET_IS_REGISTRATION_LOADING]                                 : (state, action) => {
    return Object.assign({}, state, { isLoading: action.payload})
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
  validationState     : null,
  isLoading           : false
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
