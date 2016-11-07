import { combineReducers } from 'redux';
import { subjectsGridReducer } from './SubjectsGridReducer';
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectsGridReducer,
  form: reduxFormReducer
});

export default reducers;
