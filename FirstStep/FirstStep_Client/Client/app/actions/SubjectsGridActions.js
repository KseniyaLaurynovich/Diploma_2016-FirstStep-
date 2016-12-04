import * as types from '../constants/ActionTypes';

export function getSubjectsSuccess(subjects) {
  return {
    type: types.GET_SUBJECTS_SUCCESS,
    subjects: subjects,
    isAdding: false
  }
}

export function setAddDialogVisibility(visible){
    return{
        type: types.CHANGE_ADD_DIALOG_VISIBILITY,
        isAdding: visible
    }
}

export function setDeleteDialogVisibility(visible, subjectId){
    return{
        type: types.CHANGE_DELETE_DIALOG_VISIBILITY,
        isDeleting: visible,
        subjectId
    };
};

export function setManageGroupsDialogVisibility(visible, subject){
    return{
        type: types.CHANGE_GROUP_DIALOG_VISIBILITY,
        isGroupManaging: visible,
        subject
    };
};

export function addSubjectSuccess(newSubject){
    return{
        type: types.ADD_SUBJECT_SUCCESS,
        subject: newSubject
    }
}

export function deleteSubjectSuccess(subjectId){
    return{
        type: types.DELETE_SUBJECT_SUCCESS,
        subjectId
    }
}

export function addTaskSuccess(newTask){
    return{
        type: types.ADD_TASK_SUCCESS,
        task: newTask
    }
}

export function setTaskDialogVisibility(visible, subjectId) {
  return {
    type: types.CHANGE_TASK_DIALOG_VISIBILITY,
    subjectId,
    isTaskAdding: visible
  }
}
