import { combineReducers } from 'redux';
import { subjectsGridReducer } from './SubjectsGridReducer';
import { registrationReducer } from './RegistrationReducer'
import { loginReducer } from './LoginReducer';
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectsGridReducer,
  form: reduxFormReducer,
  auth: loginReducer,
  registration: registrationReducer
});

export default reducers;
