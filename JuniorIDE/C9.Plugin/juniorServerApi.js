define(function(require, exports, module) {
    "use strict";
    
    const BASE_URL = "https://junioride-site.com/";
    const GET_TASKS = "tasks/getByGroup/";
    const GET_GROUPS = "groups/all/";
    const GET_TOKEN = "token";
    const UPLOAD_PROJECT = "project/upload/";

    var JuniorServerApi = function(http) {
        this.http = http;
    };
    
    JuniorServerApi.prototype.getTasks = function(group, callback){
        var url = BASE_URL + GET_TASKS + group; 
        
        this.http.request(url, function(err, data){
            //todo handle err
            if(err) console.log(err);
            
            if(callback) callback(data);
            
        }.bind(this));
    };
    
    JuniorServerApi.prototype.getGroups = function(callback){
        var url = BASE_URL + GET_GROUPS; 
        
        this.http.request(url, function(err, data){
            //todo handle err
            if(err) console.log(err);
            
            if(callback) callback(data);
            
        }.bind(this));
    };
    
    JuniorServerApi.prototype.getToken = function(login, password, callback){
        var url = "https://junioride-site.com/token"; 
        var params = "grant_type=password&username=" + login + "&password=" + password;
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(e)
        {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);
                if(callback) callback(response);
            }
        }; 
        
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(params);
    };
    
    JuniorServerApi.prototype.uploadProject = function(taskId, stream, callback){
        //todo add task id impl
        var url = BASE_URL + UPLOAD_PROJECT; 
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                if(callback) callback(); 
            }
        }; 
        
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(stream);
    };
    
    return JuniorServerApi;
});