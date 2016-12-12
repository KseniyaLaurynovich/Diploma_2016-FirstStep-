import * as types from '../constants/ActionTypes'

const initialState = {
    users: [],
    roles: [],
    currentUser: null,
    isEditing: false,
    isDeleting: false,
    isManagingRoles: false
};

export function usersReducer(state = initialState, action){
  switch(action.type){
    case types.GET_ALL_USERS_SUCCESS:
      action.users.sort(function(item1, item2){
        return item1.Email > item2.Email;
      });
      return Object.assign({}, state, { users: action.users });
    case types.CHANGE_EDIT_USER_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isEditing: action.isEditing, currentUser: action.currentUser });
    case types.CHANGE_DELETE_USER_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isDeleting: action.isDeleting, currentUser: action.currentUser });
    case types.UPDATE_USER_SUCCESS:
      var refreshUsers = state.users.filter((item) => item.Id !== action.user.Id);
      refreshUsers.push(action.user);
      refreshUsers.sort(function(item1, item2){
        return item1.Email > item2.Email;
      });
      return Object.assign({}, state, { users: refreshUsers, isEditing: false, currentUser: null })
    case types.DELETE_USER_SUCCESS:
      var refreshUsers = state.users.filter((item) => item.Id !== action.user.Id);
      return Object.assign({}, state, { users: refreshUsers, isDeleting: false, currentUser: null })
    case types.CHANGE_MANAGE_ROLES_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isManagingRoles: action.isManagingRoles, currentUser: action.user })
    case types.GET_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.roles })
    case types.ASSIGN_ROLE_SUCCESS:
      var refreshUsers = state.users.filter((item) => item.Id !== action.user.Id);
      refreshUsers.push(action.user);
      refreshUsers.sort(function(item1, item2){
        return item1.Email > item2.Email;
      });
      return Object.assign({}, state, { users: refreshUsers, isManagingRoles: false, currentUser: null })
    case types.UNASSIGN_ROLE_SUCCESS:
      var refreshUsers = state.users.filter((item) => item.Id !== action.user.Id);
      refreshUsers.push(action.user);
      refreshUsers.sort(function(item1, item2){
        return item1.Email > item2.Email;
      });
      return Object.assign({}, state, { users: refreshUsers, isManagingRoles: false, currentUser: null })
  }
  return state;
}
