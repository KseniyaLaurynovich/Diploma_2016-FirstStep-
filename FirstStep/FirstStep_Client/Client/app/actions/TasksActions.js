import * as types from '../constants/ActionTypes';

export function getTaskSuccess(task){
  return{
    type: types.GET_TASK_SUCCESS,
    task
  };
}

export function getTasksSuccess(tasks){
  return{
    type: types.GET_TASKS_SUCCESS,
    tasks
  }
}

export function setAddDialogVisibility(visibility){
  return{
    type: types.CHANGE_ADMIN_ADD_TASK_DIALOG_VISIBILITY,
    isAdding: visibility
  }
}

export function getAllTeachesSuccess(users){
  return{
    type: types.GET_ADMIN_ALL_USERS_SUCCESS,
    users
  }
}

export function getAllSubjectsSuccess(subjects){
  return{
    type: types.GET_ALL_SUBJECTS_SUCCESS,
    subjects
  }
}

export function userChange(userId){
  return{
    type: types.USER_ID_CHANGED,
    userId
  }
}

export function addTaskSuccess(task){
  return{
    type: types.ADMIN_ADD_TASK_SUCCESS,
    task
  }
}

export function editTaskSuccess(task){
  return{
    type: types.ADMIN_EDIT_TASK_SUCCESS,
    task
  }
}

export function setEditDialogVisibility(visibility, task){
  return{
    type: types.CHANGE_ADMIN_EDIT_TASK_DIALOG_VISIBILITY,
    task,
    isEditing: visibility
  }
}

export function setDeleteDialogVisibility(visibility, task){
  return{
    type: types.CHANGE_ADMIN_DELETE_TASK_DIALOG_VISIBILITY,
    task,
    isDeleting: visibility
  }
}

export function deleteTaskSuccess(task){
  return{
    type: types.ADMIN_DELETE_TASK_SUCCESS,
    task
  }
}

export function setAddTestDialogVisibility(visibility, task){
  return{
    type: types.CHANGE_ADD_TEST_DIALOG_VISIBILITY,
    task,
    isTestAdding: visibility
  }
}

export function changeNewTestType(){
  return{
    type: types.CHANGE_NEW_TEST_TYPE
  }
}
