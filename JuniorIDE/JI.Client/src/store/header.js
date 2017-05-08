import requests from '../utils/requests'
import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_HEADER  = 'SET_HEADER'
// ------------------------------------
// Actions
// ------------------------------------

export const handleHeaderChange = (header) => {
    return {
        type    : SET_HEADER,
        payload : header
    }
}

export const actions = {
  handleHeaderChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_HEADER] : (state, action) => {
    return Object.assign({}, state, { value: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
    value: "Junior IDE"
}

export default function headerReducer(state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
