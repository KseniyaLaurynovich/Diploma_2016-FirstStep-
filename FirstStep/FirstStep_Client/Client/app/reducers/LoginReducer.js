import * as types from '../constants/ActionTypes'
import { logout } from '../utils/cookieHelper'

const initialState = {
    username: null,
    jwt: null,
    roles: [],
    isAuthenticated: false,
    error: null,
    expires: null
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        return Object.assign({}, state, { username: action.username, jwt: action.jwt, roles: action.roles, isAuthenticated: action.isAuthenticated, expires: action.expires, error: null });
    case types.LOGIN_FAILED:
        return Object.assign({}, state, { error: action.loginError});
    case types.LOGOUT:
      logout();
      return Object.assign({}, state, initialState);
    }
  return state;
};
