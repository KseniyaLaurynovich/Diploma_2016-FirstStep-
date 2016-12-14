import axios from 'axios'
import store from '../store'
import { loginSuccess, loginFailed } from '../actions/AccountActions'
import { push } from 'react-router-redux'
import { loadAuthCookie } from './cookieHelper'

export function getAllUsers(){
  var token = loadAuthCookie().jwt;
  return axios({
    method: 'get',
    url: 'http://test_site.com/Account/users',
    headers:{"Authorization": "Bearer " + token }
  })
}

export function editUser(user){
  var token = loadAuthCookie().jwt;
  return axios({
    method: 'put',
    url: 'http://test_site.com/Account/edit',
    data: user,
    headers:{"Authorization": "Bearer " + token }
  })
}

export function deleteUser(user){
  var token = loadAuthCookie().jwt;
  return axios({
    method: 'delete',
    url: 'http://test_site.com/Account/delete/' + user.Id,
    headers:{"Authorization": "Bearer " + token }
  })
}

export function getAllSubjects(){
  var token = loadAuthCookie().jwt;
  return axios({
    method: 'get',
    url: 'http://test_site.com/subjects/getall',
    headers:{"Authorization": "Bearer " + token }
  })
}

export function saveSubject(subject, userId){
  var token = loadAuthCookie().jwt;
  return axios({
    method: 'post',
    url: 'http://test_site.com/subjects/save/' + userId,
    data: subject,
    headers:{"Authorization": "Bearer " + token }
  })
}

export function deleteSubject(subjectId){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'delete',
    url: 'http://test_site.com/subjects/delete/' + subjectId,
    headers:{"Authorization": "Bearer " + token }
  });
}

export function getAllTasks(){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'get',
    url: 'http://test_site.com/tasks/getall/',
    headers:{"Authorization": "Bearer " + token }
  });
}

export function saveTask(task){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'post',
      url: 'http://test_site.com/tasks/save',
      data: task,
      headers:{"Authorization": "Bearer " + token },
      data: task
    });
}

export function deleteTask(taskId){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'delete',
    url: 'http://test_site.com/tasks/delete/' + taskId,
    headers:{"Authorization": "Bearer " + token }
  });
}

export function getAllRoles(){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'get',
    url: 'http://test_site.com/Roles/getall/',
    headers:{"Authorization": "Bearer " + token }
  });
}

export function assignToRole(userId, role){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'put',
    url: 'http://test_site.com/Roles/assign/' + userId + '/' + role,
    headers:{"Authorization": "Bearer " + token }
  });
}

export function unassignFromRole(userId, role){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'put',
    url: 'http://test_site.com/Roles/unassign/' + userId + '/' + role,
    headers:{"Authorization": "Bearer " + token }
  });
}

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

export function saveTest(taskId, test){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'post',
    url: 'http://test_site.com/tests/save/' + taskId,
    headers:{"Authorization": "Bearer " + token, "Content-Type": "multipart/form-data"},
    data: test
  });
}

export function saveGroup(group){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'post',
    url: 'http://test_site.com/group/save/',
    headers:{"Authorization": "Bearer " + token},
    data: group
  });
}

export function deleteGroup(groupId){
  var token = loadAuthCookie().jwt;
  return  axios({
    method: 'delete',
    url: 'http://test_site.com/group/delete/' + groupId,
    headers:{"Authorization": "Bearer " + token}
  });
}
