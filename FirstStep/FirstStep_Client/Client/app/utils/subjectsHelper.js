import axios from 'axios'
import { loadAuthCookie } from './cookieHelper'

export function getSubjectsForUser (){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'get',
      url: 'http://test_site.com/subjects/get/',
      headers:{"Authorization": "Bearer " + token }
    });
};

export function addSubject(subject){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'post',
      url: 'http://test_site.com/subjects/save',
      headers:{"Authorization": "Bearer " + token },
      data: subject
    });
}

export function addTask(task){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'post',
      url: 'http://test_site.com/tasks/save',
      headers:{"Authorization": "Bearer " + token },
      data: task
    });
}

export function deleteSubjectById(subjectId){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'delete',
      url: 'http://test_site.com/subjects/delete/' + subjectId,
      headers:{"Authorization": "Bearer " + token }
    });
}
