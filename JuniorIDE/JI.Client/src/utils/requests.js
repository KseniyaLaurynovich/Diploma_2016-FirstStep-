import axios from 'axios'

const BASE_URL = 'http://JuniorIDE-site.com'

export function getToken(userData){
  userData.grant_type = 'password';

  return axios({
    method: 'post',
    url     : BASE_URL + '/token',
    headers : {"Content-Type": "application/x-www-form-urlencoded"},
    data    : "grant_type=password&username=" + userData.username + "&password=" + userData.password
  });
}

export function registerUser(registrationData){
  return axios({
    method  : 'post',
    url     : BASE_URL + '/account/register',
    headers : {"Content-Type": "application/json"},
    data    : JSON.stringify(registrationData)
  });
}

export function fetchUserInfo(token){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/account/info',
    headers : {"Authorization": "Bearer " + token}
  });
}

export function changePassword(token, data){
  return axios({
    method  : 'post',
    url     : BASE_URL + '/account/changepassword',
    headers : {"Authorization": "Bearer " + token, "Content-Type": "application/json"},
    data    : JSON.stringify(data)
  });
}

export function fetchUsers(token){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/users/all',
    headers : {"Authorization": "Bearer " + token }
  });
}

export function fetchRoles(token){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/roles/all',
    headers : {"Authorization": "Bearer " + token }
  });
}

export function editUser(token, user){
  return axios({
    method  : 'put',
    url     : BASE_URL + '/users/edit',
    headers : {"Authorization": "Bearer " + token, "Content-Type": "application/json" },
    data    : JSON.stringify(user)
  })
}

export function deleteUser(token, userId){
  return axios({
    method  : 'delete',
    url     : BASE_URL + '/users/delete/' + userId,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function fetchSubjectsForTeacher(token){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/subjects/getByUser',
    headers : {"Authorization": "Bearer " + token }
  })
}

export function fetchSubjectById(token, id){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/subjects/getById/' + id,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function fetchTask(token, id){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/tasks/getById/' + id,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function saveSubject(token, subject){
  return axios({
    method  : 'post',
    url     : BASE_URL + '/subjects/save',
    headers : {"Authorization": "Bearer " + token, "Content-Type": "application/json" },
    data    : JSON.stringify(subject)
  })
}

export function saveTask(token, task){
  return axios({
    method  : 'post',
    url     : BASE_URL + '/tasks/save',
    headers : {
      "Authorization" : "Bearer " + token,
      "Content-Type"  : "application/json"
     },
    data    : JSON.stringify(task)
  })
}

export function deleteSubject(token, subjectId){
  return axios({
    method  : 'delete',
    url     : BASE_URL + '/subjects/delete/' + subjectId,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function fetchGroups(token){
  return axios({
    method  : 'get',
    url     : BASE_URL + '/groups/all',
    headers : {"Authorization": "Bearer " + token }
  });
}

export function editGroup(token, group){
  return axios({
    method  : 'post',
    url     : BASE_URL + '/groups/save',
    headers : {"Authorization": "Bearer " + token, "Content-Type": "application/json" },
    data    : JSON.stringify(group)
  })
}

export function deleteGroup(token ,groupId){
  return axios({
    method  : 'delete',
    url     : BASE_URL + '/groups/delete/' + groupId,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function toggleTaskVisibility(token, taskId, isVisible){
  return axios({
    method  : 'put',
    url     : BASE_URL + '/tasks/changeVisibility/' + taskId + '/' + isVisible,
    headers : {"Authorization": "Bearer " + token }
  })
}

export function saveTaskTest(token, taskId, file){
  var data = new FormData();
  data.append("file", file);
  return axios({
    method : 'post',
    url    :  BASE_URL + '/tasks/saveTest/' + taskId,
    contentType: false,
    headers : {"Content-Type": "multipart/form-data"},
    data   :  data
  })
}

const requests = {
  getToken,
  registerUser,
  fetchUserInfo,
  changePassword,
  fetchUsers,
  fetchRoles,
  editUser,
  deleteUser,
  fetchSubjectsForTeacher,
  saveSubject,
  fetchSubjectById,
  deleteSubject,
  fetchGroups,
  editGroup,
  deleteGroup,
  saveTask,
  fetchTask,
  toggleTaskVisibility,
  saveTaskTest
}

export default requests
