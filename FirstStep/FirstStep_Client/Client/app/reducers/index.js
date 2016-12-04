import { combineReducers } from 'redux';
import { subjectsGridReducer } from './SubjectsGridReducer';
import { registrationReducer } from './RegistrationReducer'
import { loginReducer } from './LoginReducer';
import { taskReducer }  from './TasksReducer';
import { usersReducer }  from './UsersReducer';
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectsGridReducer,
  form: reduxFormReducer,
  auth: loginReducer,
  registration: registrationReducer,
  taskDetails: taskReducer,
  usersManaging: usersReducer
});

export default reducers;
