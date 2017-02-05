import axios from 'axios'

const BASE_URL = 'http://JuniorIDE-site.com'

export function getToken(userData){
  userData.grant_type = 'password';

  return axios({
    method: 'post',
    url: BASE_URL + '/token',
    headers:{"Content-Type": "application/x-www-form-urlencoded"},
    data: "grant_type=password&username=" + userData.username + "&password=" + userData.password
  });
}

export function registerUser(registrationData){
  return axios({
    method: 'post',
    url: BASE_URL + '/account/register',
    headers:{"Content-Type": "application/json"},
    data: JSON.stringify(registrationData)
  });
}

export function fetchUserInfo(token){
  return axios({
    method: 'get',
    url: BASE_URL + '/account/info',
    headers:{"Authorization": "Bearer " + token}
  });
}

const requests = {
  getToken,
  registerUser,
  fetchUserInfo
}

export default requests
