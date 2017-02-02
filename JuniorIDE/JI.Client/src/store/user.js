// ------------------------------------
// Constants
// ------------------------------------
export const SET_CREDENTIALS = 'SET_CREDENTIALS'

// ------------------------------------
// Actions
// ------------------------------------

export const setUserCredentials = (credentials, isAuthorized) => {
  return {
    type: SET_CREDENTIALS,
    payload: {credentials : credentials, isAuthorized : isAuthorized }
  }
}

export const actions = {
  setUserCredentials
}

// ------------------------------------
// Functions
// ------------------------------------

export function saveUserCredentials(credentials, isRemember){
    return (dispatch, getState) => {
      dispatch(setUserCredentials(credentials, true))

      if(isRemember){
        var userInfo = getState().user
        localStorage.setItem('user', JSON.stringify(userInfo))
      }
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_CREDENTIALS] : (state, action) => {
    return Object.assign({}, state, action.payload)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function getInitialState () {
  var credentials = JSON.parse(localStorage.getItem('user'))
  return {
    credentials,
    isAuthorized    : credentials != null
  }
}
const initialState = getInitialState()

export default function userReducer(state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
