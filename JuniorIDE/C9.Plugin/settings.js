define(function(require, exports, module) {
    "use strict";
    
    const JUNIOR_SETTINGS = "user/junior-ide/";
    
    var Settings = function(settings) {
        this.settings = settings;
    };
    
    Settings.prototype.loginKey = JUNIOR_SETTINGS + "@login";
    Settings.prototype.passwordKey = JUNIOR_SETTINGS + "@password";
    
    Settings.prototype.getUsername = function(){
        return this.settings.get(this.loginKey);
    }
    
    Settings.prototype.getPassword = function(){
        return this.settings.get(this.passwordKey);
    }
    
    return Settings;
});
