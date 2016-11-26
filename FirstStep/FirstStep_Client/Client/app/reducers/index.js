import { combineReducers } from 'redux';
import { subjectsGridReducer } from './SubjectsGridReducer';
import { registrationReducer } from './RegistrationReducer'
import { loginReducer } from './LoginReducer';
import { taskReducer }  from './TasksReducer';
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectsGridReducer,
  form: reduxFormReducer,
  auth: loginReducer,
  registration: registrationReducer,
  taskDetails: taskReducer
});

export default reducers;
