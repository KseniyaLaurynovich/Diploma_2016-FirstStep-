import axios from 'axios'
import { loadAuthCookie } from './cookieHelper'

export function getTaskById (taskId){
    var token = loadAuthCookie().jwt;
    return  axios({
      method: 'get',
      url: 'http://test_site.com/tasks/get/' + taskId,
      headers:{"Authorization": "Bearer " + token }
    });
};
