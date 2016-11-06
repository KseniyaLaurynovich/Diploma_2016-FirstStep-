import * as types from '../constants/ActionTypes';

export function getSubjectsSuccess(subjects) {
  return {
    type: types.GET_SUBJECTS_SUCCESS,
    subjects: subjects,
    isAdding: false
  };
};

export function setAddDialogVisibility(visible){
    return{
        type: types.CHANGE_ADD_DIALOG_VISIBILITY,
        isAdding: visible
    };
};

export function setDeleteDialogVisibility(visible, subjectId){
    return{
        type: types.CHANGE_DELETE_DIALOG_VISIBILITY,
        isDeleting: visible,
        subjectId
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
