import * as types from '../constants/ActionTypes'

export function  getSubjectsSuccess(subjects){
  return{
    type: types.GET_ALL_SUBJECTS_SUCCESS,
    subjects
  }
}

export function setAddDialogVisibility(visible){
  return{
    type: types.CHANGE_ADMIN_ADD_SUBJECT_DIALOG_VISIBILITY,
    isAdding: visible
  }
}

export function getAllTeachesSuccess(teachers){
  return{
    type: types.GET_ALL_TEACHES_SUCCESS,
    teachers
  }
}

export function addSubjectSuccess(subject){
  return{
    type: types.ADMIN_ADD_SUBJECT_SUCCESS,
    subject
  }
}

export function setEditDialogVisibility(visibility, subject){
  return{
    type: types.CHANGE_ADMIN_EDIT_SUBJECT_DIALOG_VISIBILITY,
    isEditing: visibility,
    subject
  }
}

export function editSubjectSuccess(subject){
  return{
    type: types.ADMIN_EDIT_SUBJECT_SUCCESS,
    subject
  }
}

export function setDeleteDialogVisibility(visibility, subject){
  return{
    type: types.CHANGE_ADMIN_DELETE_SUBJECT_DIALOG_VISIBILITY,
    isDeleting: visibility,
    subject
  }
}

export function deleteSubjectSuccess(subject){
  return{
    type: types.GET_ADMIN_ALL_SUBJECTS_SUCCESS,
    subject
  }
}

export function getAllGroupsSuccess(groups){
  return{
    type: types.GET_ADMIN_ALL_GROUPS_SUCCESS,
    groups
  }
}

export function setManageGroupsDialogVisibility(visibility, subject){
  return{
    type: types.CHANGE_ADMIN_MANAGE_GROUP_DIALOG_VISIBILITY,
    isManagingGroups: visibility,
    subject
  }
}

export function assignGroupSuccess(subject){
  return{
    type: types.ASSIGN_ADMIN_GROUP_SUCCESS,
    subject
  }
}

export function unassignGroupSuccess(subject){
  return{
    type: types.UNASSIGN_ADMIN_GROUP_SUCCESS,
    subject
  }
}
