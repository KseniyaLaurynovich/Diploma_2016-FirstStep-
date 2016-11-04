import axios from 'axios';
import store from '../store';
import { getSubjectsSuccess } from '../actions/SubjectsActions';

export function getSubjectsForUser (userId){
    return axios.get('http://firststep.com/subjects/get/' + userId)
    .then(function(response){
        store.dispatch(getSubjectsSuccess(JSON.parse(response.data.Data)));
        return response;
    });
};
