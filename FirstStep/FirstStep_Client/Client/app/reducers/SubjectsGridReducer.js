import * as types from '../constants/ActionTypes'

const initialState = {
    subjects: [],
    subject: null,
    isTaskAdding: false,
    isAdding: false,
    isDeleting: false,
    isGroupManaging: false,
    currentSubjectId: null,
    groups: []
};

export function subjectsGridReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_SUBJECTS_SUCCESS:
        return Object.assign({}, state, { subjects:  action.subjects });

    case types.CHANGE_ADD_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isAdding:  action.isAdding });

    case types.ADD_SUBJECT_SUCCESS:
        var subjects = state.subjects.concat(action.subject);
        return Object.assign({}, state, { subjects:  subjects, isAdding: false });

    case types.DELETE_SUBJECT_SUCCESS:
        var filtered = state.subjects.filter((value) => {return value.Id !== state.currentSubjectId});
        return Object.assign({}, state, {subjects: filtered, isDeleting: false});

    case types.CHANGE_DELETE_DIALOG_VISIBILITY:
        return Object.assign({}, state, { currentSubjectId: action.subjectId, isDeleting: action.isDeleting });

    case types.CHANGE_TASK_DIALOG_VISIBILITY:
        return Object.assign({}, state, { currentSubjectId: action.subjectId, isTaskAdding: action.isTaskAdding });

    case types.CHANGE_GROUP_DIALOG_VISIBILITY:
        return Object.assign({}, state, { isGroupManaging: action.isGroupManaging, subject: action.subject });

    case types.ADD_TASK_SUCCESS:
        var current = state.subjects.filter((value) => {return value.Id === state.currentSubjectId})[0];
        if(!current.Tasks){
          current.Tasks = [];
        }
        current.Tasks.push(action.task);
        return Object.assign({}, state, { isTaskAdding: false });

    case types.GET_GROUPS_SUCCESS:
      return Object.assign({}, state, {groups: action.groups});

    case types.ASSIGN_GROUP_SUCCESS:
      var refreshSubjects = state.subjects.filter((item) => item.Id !== action.subject.Id);
      refreshSubjects.push(action.subject);
      return Object.assign({}, state, {subject: action.subject, subjects: refreshSubjects});

    case types.UNASSIGN_GROUP_SUCCESS:
      var refreshSubjects = state.subjects.filter((item) => item.Id !== action.subject.Id);
      refreshSubjects.push(action.subject);
      return Object.assign({}, state, {subject: action.subject, subjects: refreshSubjects});
    }
  return state;
};
