define(function(require, exports, module) {
    "use strict";
    
    const JUNIOR_SETTINGS = "user/junior-ide/";
    
    var Settings = function(settings) {
        this.settings = settings;
    };
    
    Settings.prototype.loginKey = JUNIOR_SETTINGS + "@login";
    Settings.prototype.passwordKey = JUNIOR_SETTINGS + "@password";
    Settings.prototype.currentTask = JUNIOR_SETTINGS + "@currentTask";
    
    Settings.prototype.getUsername = function(){
        return this.settings.get(this.loginKey);
    }
    
    Settings.prototype.getPassword = function(){
        return this.settings.get(this.passwordKey);
    }
    
    Settings.prototype.setCurrentTask = function(taskId){
        return this.settings.set(this.currentTask, taskId);
    }
    
    Settings.prototype.getCurrentTask = function(){
        return this.settings.get(this.currentTask);
    }
    
    return Settings;
});
