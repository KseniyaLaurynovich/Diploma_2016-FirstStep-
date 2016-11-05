import { GET_SUBJECTS_SUCCESS, ADD_SUBJECT_REQUEST_START, ADD_SUBJECT_REQUEST_END, ADD_SUBJECT_SUCCESS  } from '../constants/ActionTypes';

export function getSubjectsSuccess(subjects) {
  return {
    type: GET_SUBJECTS_SUCCESS,
    subjects: subjects,
    isAdding: false
  };
};

export function addSubjectStart(){
    return{
        type: ADD_SUBJECT_REQUEST_START,
        isAdding: true
    };
};

export function addSubjectEnd(){
    return{
        type: ADD_SUBJECT_REQUEST_END,
        isAdding: false
    };
};

export function addSubjectSuccess(newSubject){
    return{
        type: ADD_SUBJECT_SUCCESS,
        subject: newSubject
    }
}
