define(function(require, exports, module) {
    "use strict";
    
    const GROUPS_URL = "https://junioride-site.com/groups/all/";
    
    var GroupsList = function(http) {
        
        this.groups = {};
        this.onReload = undefined;
        this.http = http;
    };
    
    GroupsList.prototype.load = function(){
        this.http.request(GROUPS_URL, function(err, data){
            if(err) console.log(err);
            
            this.groups = data;
            if(this.onReload) this.onReload(); 
            
        }.bind(this));
    };
    
    return GroupsList;
});