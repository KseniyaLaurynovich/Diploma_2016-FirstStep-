import * as types from '../constants/ActionTypes';
var axios = require('axios');

const apiUrl = __API_URL__;
const subjectsApiUrl = apiUrl + '/subjects';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function handleApiError(error) {
  console.log('request failed', error)
}

function getSubjectsRequest() {
  return {
    type: types.GET_SUBJECTS_REQUEST
  };
}

function getSubjectsSuccess(todos) {
  return {
    type: types.GET_SUBJECTS_SUCCESS,
    subjects: subjects
  };
}

export function getSubjects() {
  return (dispatch, getState) => {
    dispatch(getTodosRequest());
    axios.get(todoApiUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      dispatch(getSubjectsSuccess(data));
    })
    .catch(handleApiError);
  };
}
