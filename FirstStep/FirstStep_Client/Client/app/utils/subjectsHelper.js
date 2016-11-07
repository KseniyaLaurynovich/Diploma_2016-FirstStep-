import axios from 'axios';
import store from '../store';
import { getSubjectsSuccess, addSubjectSuccess, deleteSubjectSuccess, addTaskSuccess } from '../actions/SubjectsGridActions';

export function getSubjectsForUser (userId){
    return axios.get('http://firststep.com/subjects/get/' + userId)
    .then(function(response){
        store.dispatch(getSubjectsSuccess(JSON.parse(response.data.Data)));
        return response;
    });
};

export function addSubject(subject){
    return axios.post('http://firststep.com/subjects/save', subject)
    .then(function(response){
        store.dispatch(addSubjectSuccess(JSON.parse(response.data.Data)))
    });
}

export function addTask(task){
    return axios.post('http://firststep.com/tasks/save', task)
    .then(function(response){
        store.dispatch(addTaskSuccess(JSON.parse(response.data.Data)))
    });
}

export function deleteSubjectById(subjectId){
    return axios.delete('http://firststep.com/subjects/delete/' + subjectId)
    .then(function(response){
        store.dispatch(deleteSubjectSuccess(subjectId))
    });
}
