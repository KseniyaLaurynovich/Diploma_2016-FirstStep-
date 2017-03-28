define(function(require, exports, module) {
    "use strict";
    
    const JUNIOR_SETTINGS = "user/junior-ide/@group";
    
    var AuthSettings = function(settings) {
        
        this.settings = settings;
    };
    
    AuthSettings.prototype.getGroup = function(){
        return this.settings.get(JUNIOR_SETTINGS);
    };
    
    AuthSettings.prototype.groupKey = JUNIOR_SETTINGS;
    
    return AuthSettings;
});
