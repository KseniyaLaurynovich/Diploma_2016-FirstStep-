define(function(require, exports, module) {
    "use strict";
    
    const TASKS_URL = "https://junioride-site.com/tasks/getByGroup/"
    
    var TasksList = function(http, group) {
        
        this.tasks = {};
        this.onReload = undefined;
        this.http = http;
        this.group = group;
        
        this.load();
    };
    
    TasksList.prototype.load = function(){
        this.http.request(TASKS_URL + this.group, function(err, data){
            if(err) console.log(err);
            
            this.tasks = data;
            
            if(this.onReload) this.onReload();
        }.bind(this));
    };
    
    return TasksList;
});