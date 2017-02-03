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

const requests = {
  getToken,
  registerUser
}

export default requests
