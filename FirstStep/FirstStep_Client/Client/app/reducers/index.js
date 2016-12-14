import { combineReducers } from 'redux'
import { subjectsGridReducer } from './SubjectsGridReducer'
import { registrationReducer } from './RegistrationReducer'
import { loginReducer } from './LoginReducer'
import { taskReducer }  from './TasksReducer'
import { usersReducer }  from './UsersReducer'
import { subjectsReducer } from './SubjectsReducer'
import { tasksManagingReducer } from './TasksManagingReducer'
import { taskFormManagingReducer } from './TaskFormReducer'
import { groupsManagingReducer } from './GroupsManagingReducer'
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectsGridReducer,
  form: reduxFormReducer,
  auth: loginReducer,
  registration: registrationReducer,
  taskDetails: taskReducer,
  usersManaging: usersReducer,
  subjectsManaging: subjectsReducer,
  tasksManaging: tasksManagingReducer,
  taskForm: taskFormManagingReducer,
  groupsManaging: groupsManagingReducer
});

export default reducers;
