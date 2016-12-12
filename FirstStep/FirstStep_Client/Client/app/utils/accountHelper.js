import axios from 'axios'
import store from '../store'
import { loginSuccess, loginFailed } from '../actions/AccountActions'
import { push } from 'react-router-redux'
import { loadAuthCookie } from './cookieHelper'

export function login(email, password){
  var data = "username=" + email + "&password=" + password + "&grant_type=password";
  return axios({
    method: 'post',
    url: 'http://test_site.com/token',
    headers:{"Content-Type": "application/x-www-form-urlencoded"},
    data: data
  });
}

export function register(data){
  return axios.post("http://test_site.com/Account/Register", data);
}
