import { GET_SUBJECTS_SUCCESS, ADD_SUBJECT_REQUEST_START, ADD_SUBJECT_REQUEST_END, ADD_SUBJECT_SUCCESS } from '../constants/ActionTypes';

const initialState = {
    subjects: [],
    isAdding: false
};

export function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS_SUCCESS:
        return Object.assign({}, state, { subjects:  action.subjects });
    case ADD_SUBJECT_REQUEST_START:
        return Object.assign({}, state, { isAdding:  action.isAdding });
    case ADD_SUBJECT_REQUEST_END:
        return Object.assign({}, state, { isAdding:  action.isAdding });
    case ADD_SUBJECT_SUCCESS:
        var subjects = state.subjects.concat(action.subject);
        return Object.assign({}, state, { subjects:  subjects, isAdding: false });
    }
  return state;
};
