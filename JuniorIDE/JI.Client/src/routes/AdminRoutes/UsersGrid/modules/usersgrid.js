import requests from '../../../../utils/requests'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchUsersSuccess = (users) => {
  return {
    type    : FETCH_USERS_SUCCESS,
    payload : users
  }
}

export function fetchUsers(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchUsers(token).then(function(response){
      console.log(response)
      dispatch(fetchUsersSuccess(response.data))
    },function(error){
      console.log(error)
    })
  }
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USERS_SUCCESS]       : (state, action) => {
    return Object.assign({}, state, { users: action.payload })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: []
}

export default function usersGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
