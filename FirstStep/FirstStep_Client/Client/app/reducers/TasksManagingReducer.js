import * as types from '../constants/ActionTypes'

const initialState = {
    tasks: [],
    users: [],
    subjects: [],
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    currentTask: null
};

export function tasksManagingReducer(state = initialState, action){
  switch(action.type){
    case types.GET_TASKS_SUCCESS:
      return Object.assign({}, state, { tasks: action.tasks });
    case types.CHANGE_ADMIN_ADD_TASK_DIALOG_VISIBILITY:
      return Object.assign({}, state, { isAdding: action.isAdding });
    case types.GET_ADMIN_ALL_SUBJECTS_SUCCESS:
      return Object.assign({}, state, { subjects: action.subjects })
    case types.GET_ADMIN_ALL_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users })
    case types.ADMIN_ADD_TASK_SUCCESS:
      var refreshTasks = state.tasks;
      refreshTasks.push(action.task);
      refreshTasks.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { tasks: refreshTasks, isAdding: false });
    case types.CHANGE_ADMIN_EDIT_TASK_DIALOG_VISIBILITY:
      return Object.assign({}, state, { currentTask: action.task, isEditing: action.isEditing });
    case types.ADMIN_EDIT_TASK_SUCCESS:
      var refreshTasks = state.tasks.filter((task) => task.Id !== action.task.Id);
      refreshTasks.push(action.task);
      refreshTasks.sort(function(item1, item2){
        return item1.Name > item2.Name;
      });
      return Object.assign({}, state, { tasks: refreshTasks, isEditing: false });
    case types.CHANGE_ADMIN_DELETE_TASK_DIALOG_VISIBILITY:
      return Object.assign({}, state, { currentTask: action.task, isDeleting: action.isDeleting });
    case types.ADMIN_DELETE_TASK_SUCCESS:
      var refreshTasks = state.tasks.filter((task) => task.Id !== action.task.Id);
      return Object.assign({}, state, { tasks: refreshTasks, isDeleting: false, currentTask: null })
  }
  return state;
}
