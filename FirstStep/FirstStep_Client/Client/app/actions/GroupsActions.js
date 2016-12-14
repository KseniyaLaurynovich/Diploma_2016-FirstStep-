import * as types from '../constants/ActionTypes';

export function getGroupsSuccess(groups) {
  return {
    type: types.GET_GROUPS_SUCCESS,
    groups: groups
  }
}

export function assignGroupSuccess(subject) {
  return {
    type: types.ASSIGN_GROUP_SUCCESS,
    subject: subject
  }
}

export function unassignGroupSuccess(subject) {
  return {
    type: types.UNASSIGN_GROUP_SUCCESS,
    subject: subject
  }
}

export function setAddDialogVisibility(visibility, group){
  return {
    type: types.CHANGE_ADMIN_ADD_GROUP_DIALOG_VISIBILITY,
    isAdding: visibility,
    group
  }
}

export function setEditDialogVisibility(visibility, group){
  return {
    type: types.CHANGE_ADMIN_EDIT_GROUP_DIALOG_VISIBILITY,
    isEditing: visibility,
    group
  }
}

export function addGroupSuccess(group){
  return {
    type: types.ADD_GROUP_SUCCESS,
    group
  }
}

export function editGroupSuccess(group){
  return {
    type: types.EDIT_GROUP_SUCCESS,
    group
  }
}

export function setDeleteDialogVisibility(visibility, group){
  return {
    type: types.CHANGE_ADMIN_DELETE_GROUP_DIALOG_VISIBILITY,
    isDeleting: visibility,
    group
  }
}

export function deleteGroupSuccess(groupId){
  return {
    type: types.DELETE_GROUP_SUCCESS,
    groupId
  }
}
