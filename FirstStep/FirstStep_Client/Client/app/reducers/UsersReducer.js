import * as types from '../constants/ActionTypes'

const initialState = {
    users: []
};

export function usersReducer(state = initialState, action){
  switch(action.type){
    case types.GET_ALL_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });
  }
  return state;
}
