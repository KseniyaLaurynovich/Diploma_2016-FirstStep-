import * as types from '../constants/ActionTypes'

const initialState = {
    groups: [],
    currentGroup: null,
    isAdding: false,
    isEditing: false,
    isDeleting: false
};

export function groupsManagingReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_GROUPS_SUCCESS:
        return Object.assign({}, state, { groups: action.groups});
      case types.CHANGE_ADMIN_ADD_GROUP_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isAdding: action.isAdding, currentGroup: action.group})
      case types.ADD_GROUP_SUCCESS:
        var refreshGroups = state.groups;
        refreshGroups.push(action.group);
        refreshGroups.sort(function(item1, item2){
          return item1.Name > item2.Name;
        });
        return Object.assign({}, state, { groups: refreshGroups, isAdding: false });
      case types.CHANGE_ADMIN_EDIT_GROUP_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isEditing: action.isEditing, currentGroup: action.group})
      case types.EDIT_GROUP_SUCCESS:
        var refreshGroups = state.groups.filter((group) => group.Id !== action.group.Id);
        refreshGroups.push(action.group);
        refreshGroups.sort(function(item1, item2){
          return item1.Name > item2.Name;
        });
        return Object.assign({}, state, { groups: refreshGroups, isEditing: false });
      case types.CHANGE_ADMIN_DELETE_GROUP_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isDeleting: action.isDeleting, currentGroup: action.group})
      case types.DELETE_GROUP_SUCCESS:
        var refreshGroups = state.groups.filter((group) => group.Id !== action.groupId);
        return Object.assign({}, state, { groups: refreshGroups, isDeleting: false });
    }
  return state;
};
