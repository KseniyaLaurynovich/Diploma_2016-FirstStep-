define(function(require, exports, module) {
    "use strict";
    
    const BASE_URL = "https://junioride-site.com/";
    const GET_TASKS = "tasks/get/";
    const GET_GROUPS = "groups/all/";
    const GET_TOKEN = "token";
    const UPLOAD_PROJECT = "project/upload/";
    const TASK_STATISTIC = "statistic/getByTask";

    var JuniorServerApi = function(juniorSettings) {
        this.juniorSettings = juniorSettings;
        this._token = function(){
            return this.juniorSettings.getToken();
        }
    };
    
    JuniorServerApi.prototype.getTaskStatistic = function(callback){
        var url = BASE_URL + TASK_STATISTIC;
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
        
            if (this.status != 200) {
                if(callback) callback(JSON.parse(xhr.responseText).Message);
                return;
            }
        
            var response = JSON.parse(xhr.responseText);
            
            if(callback) callback(null, response);
        }
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this._token());
        
        xhr.send();
    };
    
    JuniorServerApi.prototype.getTasks = function(callback){
        var url = BASE_URL + GET_TASKS; 
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
        
            if (this.status != 200) {
                if(callback) callback(JSON.parse(xhr.responseText).Message);
                return;
            }
        
            var response = JSON.parse(xhr.responseText);
                
            if(callback) callback(null, response);
        }
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this._token());
        
        xhr.send();
    };
    
    JuniorServerApi.prototype.getToken = function(login, password, callback){
        var url = BASE_URL + GET_TOKEN; 
        var params = "grant_type=password&username=" + login + "&password=" + password;
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
        
            if (this.status != 200) {
                if(callback) callback(JSON.parse(xhr.responseText).error_description);
                return;
            }
        
            var response = JSON.parse(xhr.responseText);
                
            if(callback) callback(null, response);
        }
        
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