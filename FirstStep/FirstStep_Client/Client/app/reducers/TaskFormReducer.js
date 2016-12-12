import * as types from '../constants/ActionTypes'

const initialState = {
    subjects: [],
    filteredSubjects: []
};

export function taskFormManagingReducer(state = initialState, action){
  switch(action.type){
    case types.GET_ADMIN_ALL_SUBJECTS_SUCCESS:
      return Object.assign({}, state, { subjects: action.subjects });
    case types.USER_ID_CHANGED:
      var filtered = state.subjects.filter((subject) => action.userId = subject.UserId)
      return Object.assign({}, state, { filteredSubjects: filtered });
  }
  return state;
}
