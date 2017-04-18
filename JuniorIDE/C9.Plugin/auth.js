define(function(require, exports, module) {
    "use strict";
    
    const JUNIOR_SETTINGS = "user/junior-ide/";
    
    var AuthSettings = function(serverApi, settings) {
        
        this.serverApi = serverApi;
        this.settings = settings;
    };
    
    AuthSettings.prototype.saveUserData = function(userData){
        alert(userData.groups);
    };
    
    AuthSettings.prototype.tryAuth = function(){
        
        var login = this.settings.get(this.loginKey);
        var password = this.settings.get(this.passwordKey); 
        
        if(login && password){
            this.serverApi.getToken(login, password, this.saveUserData);
            return true;
        }
        
        return false;
    };
    
    AuthSettings.prototype.groupKey = JUNIOR_SETTINGS + "@group";
    AuthSettings.prototype.loginKey = JUNIOR_SETTINGS + "@login";
    AuthSettings.prototype.passwordKey = JUNIOR_SETTINGS + "@password";
    
    return AuthSettings;
});
