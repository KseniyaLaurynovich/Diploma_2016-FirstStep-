import axios from 'axios';
import store from '../store';
import { getSubjectsSuccess, addSubjectSuccess, deleteSubjectSuccess } from '../actions/SubjectsActions';

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

export function deleteSubjectById(subjectId){
    return axios.delete('http://firststep.com/subjects/delete/' + subjectId)
    .then(function(response){
        store.dispatch(deleteSubjectSuccess(subjectId))
    });
}
