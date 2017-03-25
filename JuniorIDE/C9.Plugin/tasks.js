define(function(require, exports, module) {
    "use strict";
    
    var TasksList = function(http, onReload) {
        
        this.tasks = {};
        this.onReload = onReload;
        
        this.http = http;
        this.load();
    };
    
    TasksList.prototype.load = function(){
        this.http.request(
            "https://junioride-site.com/tasks/all", this.setTasks.bind(this));
    };
    
    TasksList.prototype.setTasks = function(err, data){
        this.tasks = { "item1" : "dfsadf", "item2" : "dfsadfasd"};
        this.onReload();
    };
    
    return TasksList;
});