import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
export const handleUsernameChange = (event) => {
}

export const handlePasswordChange = (event) => {
}

export const handleConfirmPasswordChange = (event) => {
}

export const handleFirstNameChange = (event) => {
}

export const handleLastNameChange = (event) => {
}

export const handlePatronymicChange = (event) => {
}

export const handleEmailChange = (event) => {
}

export function registration(e){
  e.preventDefault();

  return (dispatch, getState) => {

  }
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

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username            : null,
  firstname           : null,
  lastname            : false,
  emailError          : null,
  confirmPassword     : null,
  patronymic          : null,
  password            : null
}

export default function registrationReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
