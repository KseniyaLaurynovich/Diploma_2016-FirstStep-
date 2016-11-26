import * as types from '../constants/ActionTypes';

export function getTaskSuccess(task){
  return{
    type: types.GET_TASK_SUCCESS,
    task
  };
}
