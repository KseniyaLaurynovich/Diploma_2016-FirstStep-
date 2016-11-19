import * as types from '../constants/ActionTypes';

const initialState = {
    username: null,
    jwt: null,
    roles: [],
    isAuthenticated: false
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        return Object.assign({}, state, { username: action.username, jwt: action.jwt, roles: action.roles, isAuthenticated: action.isAuthenticated });
    }
  return state;
};
