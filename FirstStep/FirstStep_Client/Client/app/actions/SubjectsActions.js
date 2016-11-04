import { GET_SUBJECTS_SUCCESS } from '../constants/ActionTypes';

export function getSubjectsSuccess(subjects) {
  return {
    type: GET_SUBJECTS_SUCCESS,
    subjects
  };
};
