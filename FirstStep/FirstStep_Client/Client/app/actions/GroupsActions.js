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
