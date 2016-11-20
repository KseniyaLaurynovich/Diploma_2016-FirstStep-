import axios from 'axios'
import store from '../store'
import { loginSuccess } from '../actions/AccountActions'


export function login(email, password){
  var data = "username=" + email + "&password=" + password + "&grant_type=password";
  return axios({
    method: 'post',
    url: 'http://test_site.com/token',
    headers:{"Content-Type": "application/x-www-form-urlencoded"},
    data: data
  }).then(function(result){
    var username = result.data.userName;
    var jwt = result.data.access_token;
    var roles = result.data.roles.split(',');

    store.dispatch(loginSuccess(username, jwt, roles));
  });
}

export function register(data){
  return axios.post("http://test_site.com/Account/Register", data);
}
