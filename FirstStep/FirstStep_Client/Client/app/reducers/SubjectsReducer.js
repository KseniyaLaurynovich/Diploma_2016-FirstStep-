import * as types from '../constants/ActionTypes'

const initialState = {
    subjects: [],
    groups: [],
    currentSubject: null,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    teachers: [],
    isManagingGroups: false
};

export function subjectsReducer(state = initialState, action){
  switch(action.type){
    case types.GET_ALL_SUBJECTS_SUCCESS:
      action.subjects.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { subjects: action.subjects });
    case types.GET_ALL_TEACHES_SUCCESS:
      return Object.assign({}, state, { teachers: action.teachers });
    case types.CHANGE_ADMIN_ADD_SUBJECT_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isAdding: action.isAdding });
    case types.CHANGE_ADMIN_EDIT_SUBJECT_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isEditing: action.isEditing, currentSubject: action.subject });
    case types.ADMIN_ADD_SUBJECT_SUCCESS:
      var refreshSubjects = state.subjects;
      refreshSubjects.push(action.subject);
      refreshSubjects.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { subjects: refreshSubjects, isAdding: false });
    case types.ADMIN_EDIT_SUBJECT_SUCCESS:
      var refreshSubjects = state.subjects.filter((subject) => subject.Id !== action.subject.Id);
      refreshSubjects.push(action.subject);
      refreshSubjects.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { subjects: refreshSubjects, isEditing: false, currentSubject: null });
    case types.CHANGE_ADMIN_DELETE_SUBJECT_DIALOG_VISIBILITY:
      return Object.assign({}, state, { currentSubject: action.subject, isDeleting: action.isDeleting });
    case types.ADMIN_DELETE_SUBJECT_SUCCESS:
      var refreshSubjects = state.subjects.filter((subject) => subject.Id !== action.subject.Id);
      return Object.assign({}, state, { subjects: refreshSubjects, isDeleting: false, currentSubject: null })
    case types.GET_ADMIN_ALL_GROUPS_SUCCESS:
      return Object.assign({}, state, { groups: action.groups })
    case types.CHANGE_ADMIN_MANAGE_GROUP_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isManagingGroups: action.isManagingGroups, currentSubject: action.subject })
    case types.ASSIGN_ADMIN_GROUP_SUCCESS:
      var refreshSubjects = state.subjects.filter((item) => item.Id !== action.subject.Id);
      refreshSubjects.push(action.subject);
      refreshSubjects.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { subjects: refreshSubjects, isManagingGroups: false, currentSubject: null })
    case types.UNASSIGN_ADMIN_GROUP_SUCCESS:
      var refreshSubjects = state.subjects.filter((item) => item.Id !== action.subject.Id);
      refreshSubjects.push(action.subject);
      refreshSubjects.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { subjects: refreshSubjects, isManagingGroups: false, currentSubject: null })
  }
  return state;
}
