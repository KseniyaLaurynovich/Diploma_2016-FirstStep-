import axios from 'axios'
import { loadAuthCookie } from './cookieHelper'

export function getAllGroups(){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'get',
    url: 'http://test_site.com/group/get/',
    headers:{"Authorization": "Bearer " + token }
  });
}

export function assignGroup(subjectId, groupId){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'put',
    url: 'http://test_site.com/group/assign/',
    headers:{"Authorization": "Bearer " + token },
    data:{subjectId: subjectId, groupId: groupId}
  });
}

export function unassignGroup(subjectId, groupId){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'put',
    url: 'http://test_site.com/group/unassign/',
    headers:{"Authorization": "Bearer " + token },
    data:{subjectId: subjectId, groupId: groupId}
  });
}
