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

const requests = {
  getToken
}

export default requests
